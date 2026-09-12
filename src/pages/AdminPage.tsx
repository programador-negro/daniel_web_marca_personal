import React, { useState, useEffect } from 'react';
import { 
  Settings, Lock, ArrowLeft, LogOut, Plus, Edit2, Trash2, 
  Globe, Eye, EyeOff, Save, Loader2, AlertCircle, Mail, Key,
  Users, Sparkles, TrendingUp, Search, Building2, Calendar, 
  DollarSign, Clock, FileText, 
  Trash, Bookmark, Filter, FileSpreadsheet, Check, Layout
} from 'lucide-react';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { 
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, setDoc 
} from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  imageUrl?: string;
  isVisible: boolean;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message?: string;
  source: 'contact_form' | 'lead_magnet' | 'cotizador_audit';
  status: 'new' | 'contacted' | 'negotiating' | 'closed' | 'rejected';
  createdAt: any;
  notes?: string;
  calculatorData?: {
    industry: string;
    teamSize: number;
    manualHoursPerWeek: number;
    hourlyRate: number;
    estimatedSavings: number;
    hoursSaved: number;
  };
}

export interface SectionConfig {
  servicios: boolean;
  leadMagnet: boolean;
  proyectos: boolean;
  sobreMi: boolean;
  experiencia: boolean;
  faqs: boolean;
  contacto: boolean;
}

export const defaultSections: SectionConfig = {
  servicios: true,
  leadMagnet: true,
  proyectos: true,
  sobreMi: true,
  experiencia: true,
  faqs: true,
  contacto: true,
};

export const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState('');

  // Form toggle
  const [useEmailAuth, setUseEmailAuth] = useState(false);
  const [email, setEmail] = useState('daniel.ibarra.dev@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // CMS State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [activeTab, setActiveTab] = useState<'cms' | 'crm' | 'sections'>('crm');
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState<string>('all');
  const [savingNotesId, setSavingNotesId] = useState<string | null>(null);
  const [localNotes, setLocalNotes] = useState<{ [key: string]: string }>({});

  // Section Config State
  const [sectionsConfig, setSectionsConfig] = useState<SectionConfig>(defaultSections);
  const [loadingSections, setLoadingSections] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    link: '',
    imageUrl: '',
    isVisible: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.email?.toLowerCase() === 'daniel.ibarra.dev@gmail.com') {
      setLoadingSections(true);
      const docRef = doc(db, 'settings', 'sections');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setSectionsConfig({ ...defaultSections, ...docSnap.data() } as SectionConfig);
        } else {
          setDoc(docRef, defaultSections).catch((err) => handleFirestoreError(err, 'AdminPage:setDocSections'));
          setSectionsConfig(defaultSections);
        }
        setLoadingSections(false);
      }, (err) => {
        handleFirestoreError(err, 'AdminPage:onSectionsSnapshot');
        setLoadingSections(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleToggleSection = async (key: keyof SectionConfig) => {
    try {
      const updated = { ...sectionsConfig, [key]: !sectionsConfig[key] };
      setSectionsConfig(updated);
      await setDoc(doc(db, 'settings', 'sections'), updated);
    } catch (err) {
      console.error("Error updating section visibility:", err);
      alert("Error al actualizar la visibilidad de la sección");
    }
  };

  useEffect(() => {
    if (user && user.email?.toLowerCase() === 'daniel.ibarra.dev@gmail.com') {
      setLoadingProjects(true);
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projData: Project[] = [];
        snapshot.forEach((docSnap) => {
          projData.push({ id: docSnap.id, ...docSnap.data() } as Project);
        });
        setProjects(projData);
        setLoadingProjects(false);
      }, (err) => {
        handleFirestoreError(err, 'AdminPage:onSnapshot');
        setLoadingProjects(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email?.toLowerCase() === 'daniel.ibarra.dev@gmail.com') {
      setLoadingLeads(true);
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const leadData: Lead[] = [];
        const notesObj: { [key: string]: string } = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          leadData.push({ id: docSnap.id, ...data } as Lead);
          notesObj[docSnap.id] = data.notes || '';
        });
        setLeads(leadData);
        setLocalNotes((prev) => {
          // preserve unsubmitted typed values if any, otherwise populate
          const updated = { ...notesObj };
          Object.keys(prev).forEach(key => {
            if (prev[key] !== undefined && prev[key] !== notesObj[key]) {
              updated[key] = prev[key];
            }
          });
          return updated;
        });
        setLoadingLeads(false);
      }, (err) => {
        handleFirestoreError(err, 'AdminPage:onLeadsSnapshot');
        setLoadingLeads(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error al actualizar estado del prospecto");
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setSavingNotesId(leadId);
    try {
      const notesToSave = localNotes[leadId] || '';
      await updateDoc(doc(db, 'leads', leadId), { notes: notesToSave });
      setTimeout(() => {
        setSavingNotesId(null);
      }, 500);
    } catch (err) {
      console.error("Error saving notes:", err);
      alert("Error al guardar notas");
      setSavingNotesId(null);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este prospecto? Esta acción no se puede deshacer.')) {
      try {
        await deleteDoc(doc(db, 'leads', leadId));
      } catch (err) {
        console.error("Error deleting lead:", err);
        alert("Error al eliminar prospecto");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email?.toLowerCase() !== 'daniel.ibarra.dev@gmail.com') {
        await signOut(auth);
        setError('Acceso denegado: Este correo no tiene privilegios de administrador.');
      }
    } catch (err: any) {
      setError(
        err.code === 'auth/popup-blocked'
          ? 'Error: Las ventanas emergentes están bloqueadas por el navegador. Abre la app en una pestaña nueva para iniciar sesión con Google.'
          : 'Error al iniciar sesión: ' + err.message
      );
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError('');
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.email?.toLowerCase() !== 'daniel.ibarra.dev@gmail.com') {
        await signOut(auth);
        setError('Acceso denegado: Este correo no tiene privilegios de administrador.');
      }
    } catch (err: any) {
      let friendlyError = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        friendlyError = 'Credenciales incorrectas. Verifica tu contraseña.';
      } else if (err.code === 'auth/configuration-not-found') {
        friendlyError = 'El proveedor de Correo/Contraseña no está habilitado en Firebase. Por favor actívalo en tu consola Firebase.';
      }
      setError('Error de acceso: ' + friendlyError);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    
    const projectData = {
      title: formData.title,
      description: formData.description,
      tags: tagArray,
      link: formData.link,
      imageUrl: formData.imageUrl,
      isVisible: formData.isVisible,
    };

    try {
      if (isEditing && editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (err: any) {
      console.error(err);
      alert('Error al guardar el proyecto');
    }
  };

  const editProject = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      link: project.link || '',
      imageUrl: project.imageUrl || '',
      isVisible: project.isVisible
    });
    setEditingId(project.id);
    setIsEditing(true);
  };

  const deleteProject = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (err) {
        console.error(err);
        alert('Error al eliminar');
      }
    }
  };

  const toggleVisibility = async (project: Project) => {
    try {
      await updateDoc(doc(db, 'projects', project.id), {
        isVisible: !project.isVisible
      });
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', tags: '', link: '', imageUrl: '', isVisible: true });
    setIsEditing(false);
    setEditingId(null);
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] bg-noise flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-800 animate-spin" />
      </div>
    );
  }

  // --- LOGIN VIEW ---
  if (!user || user.email?.toLowerCase() !== 'daniel.ibarra.dev@gmail.com') {
    return (
      <div className="min-h-screen bg-[#fbfbfb] bg-noise flex flex-col items-center justify-center p-4">
        
        {/* Subtle background ambient lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] mesh-identity-glow rounded-full opacity-10 pointer-events-none" />

        <div className="w-full max-w-md card-editorial p-6 sm:p-10 relative z-10 space-y-8 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-slate-700" />
            </div>
            <h1 className="text-xl font-light text-slate-900 tracking-wider uppercase font-mono">
              CENTRO DE CONTROL
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Ingreso restringido de administrador para danielib.com
            </p>
          </div>

          {/* Special Preview Mode Advice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-light flex gap-2.5">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-slate-800 font-mono uppercase text-[9px] tracking-wider mb-0.5">
                💡 TIP DE VISTA PREVIA (AI STUDIO)
              </span>
              Si estás en el iframe de AI Studio, haz clic en el botón de la esquina superior derecha para abrir la app en una pestaña nueva y evitar bloqueos de ventanas emergentes de Google. O utiliza el acceso por correo abajo.
            </div>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-mono font-medium text-center">
                {error}
              </div>
            )}

            {!useEmailAuth ? (
              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full btn-ios-dark py-3.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Entrar con Google</span>
                </button>

                <button
                  onClick={() => setUseEmailAuth(true)}
                  className="w-full text-center text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors py-2"
                >
                  Usar Correo y Contraseña
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                    Correo de Administrador
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                      placeholder="daniel.ibarra.dev@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 text-slate-400 hover:text-slate-800"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-ios-dark py-3.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUseEmailAuth(false)}
                    className="w-full text-center text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors py-1"
                  >
                    Volver a Google Sign-In
                  </button>
                </div>
              </form>
            )}
            
            <a 
              href="/" 
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-[10px] font-mono uppercase tracking-widest transition-all mt-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al sitio</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#fbfbfb] bg-noise text-slate-900 p-4 sm:p-8 font-sans selection:bg-slate-100 relative">
      
      {/* Background ambient lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[300px] mesh-identity-glow rounded-full opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[300px] mesh-identity-glow rounded-full opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between card-editorial p-6 gap-4 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border transition-all ${
              activeTab === 'crm' 
                ? 'bg-amber-50/60 border-amber-100 text-amber-700' 
                : activeTab === 'cms'
                  ? 'bg-indigo-50/60 border-indigo-100 text-indigo-700'
                  : 'bg-rose-50/60 border-rose-100 text-rose-700'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-light text-slate-900 tracking-wider uppercase font-mono flex items-center gap-2">
                {activeTab === 'crm' && 'Mesa de Prospectos'}
                {activeTab === 'cms' && 'Gestor de Portafolio'}
                {activeTab === 'sections' && 'Control de Secciones'}
                <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono border font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'crm' 
                    ? 'bg-amber-50 text-amber-800 border-amber-200' 
                    : activeTab === 'cms'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {activeTab === 'crm' && 'CRM Activo'}
                  {activeTab === 'cms' && 'CMS Activo'}
                  {activeTab === 'sections' && 'Configuración'}
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-light">
                {activeTab === 'crm' && 'Gestiona tus prospectos, calcula el valor de tu pipeline de automatizaciones y realiza seguimiento.'}
                {activeTab === 'cms' && 'Administra tus proyectos y servicios de danielib.com en tiempo real.'}
                {activeTab === 'sections' && 'Activa o desactiva secciones del sitio web principal al instante.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="btn-ios-secondary flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:text-slate-950 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer bg-white">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </a>
            <button
              onClick={handleLogout}
              className="btn-ios-dark flex items-center gap-2 px-4 py-2 rounded-full text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-slate-100/70 border border-slate-200/50 rounded-2xl max-w-md">
          <button
            onClick={() => setActiveTab('crm')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'crm'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/40'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads CRM</span>
            {leads.filter(l => l.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'cms'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/40'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Portafolio</span>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'sections'
                ? 'bg-white text-slate-950 shadow-xs border border-slate-200/40'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Secciones</span>
          </button>
        </div>

        {/* Tab content 1: CRM VIEW */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            
            {/* KPI Metrics Dashboard Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Total Leads */}
              <div className="card-editorial p-5 flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1">TOTAL PROSPECTOS</p>
                  <h3 className="text-2xl font-light text-slate-900 tracking-tight font-mono">
                    {loadingLeads ? '...' : leads.length}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Card 2: New Leads */}
              <div className="card-editorial p-5 flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1">SIN ATENDER</p>
                  <h3 className={`text-2xl font-semibold tracking-tight font-mono ${leads.filter(l => l.status === 'new').length > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                    {loadingLeads ? '...' : leads.filter(l => l.status === 'new').length}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl transition-colors ${leads.filter(l => l.status === 'new').length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'}`}>
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Card 3: Pipeline Savings */}
              <div className="card-editorial p-5 flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1">PIPELINE ANUAL ROI</p>
                  <h3 className="text-xl font-mono font-semibold text-emerald-600">
                    ${leads.reduce((sum, l) => sum + (l.calculatorData?.estimatedSavings || 0), 0).toLocaleString()} <span className="text-[10px] text-slate-400 font-sans font-light">USD</span>
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Card 4: Blueprint downloads */}
              <div className="card-editorial p-5 flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1">BLUEPRINT DOWNLOADS</p>
                  <h3 className="text-2xl font-light text-slate-900 tracking-tight font-mono">
                    {loadingLeads ? '...' : leads.filter(l => l.source === 'lead_magnet').length}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-violet-50 text-violet-600">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

            </div>

            {/* Filter and Search Bar */}
            <div className="card-editorial p-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md border border-slate-200/60">
              
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar prospecto por nombre, email o empresa..."
                  value={crmSearch}
                  onChange={(e) => setCrmSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors"
                />
              </div>

              {/* Filters selector */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filtrar:
                </span>
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'new', label: 'Nuevos' },
                  { value: 'contacted', label: 'Contactados' },
                  { value: 'negotiating', label: 'En Negociación' },
                  { value: 'closed', label: 'Cerrados' },
                  { value: 'rejected', label: 'Rechazados' }
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setCrmStatusFilter(btn.value)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-semibold tracking-wider transition-all cursor-pointer ${
                      crmStatusFilter === btn.value
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Leads List */}
            <div className="card-editorial p-6 bg-white/90 backdrop-blur-md min-h-[400px] border border-slate-200/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-900">
                  Bandeja de Prospectos ({
                    leads.filter(lead => {
                      const queryText = crmSearch.toLowerCase();
                      const matchesSearch = 
                        lead.name.toLowerCase().includes(queryText) || 
                        lead.email.toLowerCase().includes(queryText) || 
                        (lead.company || '').toLowerCase().includes(queryText);
                      
                      const matchesStatus = crmStatusFilter === 'all' || lead.status === crmStatusFilter;
                      return matchesSearch && matchesStatus;
                    }).length
                  })
                </h3>
                
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Actualización en tiempo real
                </span>
              </div>

              {loadingLeads ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-6 h-6 text-slate-700 animate-spin" />
                </div>
              ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
                  <Users className="w-8 h-8 mb-2 opacity-20 text-slate-500" />
                  <p className="text-xs font-light">No hay prospectos registrados aún en la base de datos.</p>
                </div>
              ) : leads.filter(lead => {
                const queryText = crmSearch.toLowerCase();
                const matchesSearch = 
                  lead.name.toLowerCase().includes(queryText) || 
                  lead.email.toLowerCase().includes(queryText) || 
                  (lead.company || '').toLowerCase().includes(queryText);
                
                const matchesStatus = crmStatusFilter === 'all' || lead.status === crmStatusFilter;
                return matchesSearch && matchesStatus;
              }).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
                  <Search className="w-8 h-8 mb-2 opacity-20 text-slate-500" />
                  <p className="text-xs font-light">Ningún prospecto coincide con la búsqueda o filtro aplicado.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.filter(lead => {
                    const queryText = crmSearch.toLowerCase();
                    const matchesSearch = 
                      lead.name.toLowerCase().includes(queryText) || 
                      lead.email.toLowerCase().includes(queryText) || 
                      (lead.company || '').toLowerCase().includes(queryText);
                    
                    const matchesStatus = crmStatusFilter === 'all' || lead.status === crmStatusFilter;
                    return matchesSearch && matchesStatus;
                  }).map(lead => {
                    // Render background matching status
                    const statusStyles = {
                      new: 'border-amber-200/80 bg-amber-50/5 text-amber-900',
                      contacted: 'border-blue-200/80 bg-blue-50/5 text-blue-900',
                      negotiating: 'border-indigo-200/80 bg-indigo-50/5 text-indigo-950',
                      closed: 'border-emerald-200/80 bg-emerald-50/10 text-emerald-950',
                      rejected: 'border-slate-200 bg-slate-50/50 text-slate-500 opacity-60'
                    }[lead.status];

                    const sourceBadge = {
                      contact_form: { label: 'Formulario de Contacto', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/40', icon: Mail },
                      lead_magnet: { label: 'Descarga de Blueprint', bg: 'bg-violet-50 text-violet-700 border-violet-200/40', icon: FileText },
                      cotizador_audit: { label: 'Cotizador ROI', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/40', icon: DollarSign }
                    }[lead.source] || { label: lead.source, bg: 'bg-slate-100 text-slate-600 border-slate-200', icon: Bookmark };

                    const IconComponent = sourceBadge.icon;

                    return (
                      <div key={lead.id} className={`flex flex-col p-5 rounded-2xl border transition-all duration-300 ${statusStyles}`}>
                        
                        {/* Header metadata row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          
                          {/* Left: Source and info */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider border flex items-center gap-1.5 ${sourceBadge.bg}`}>
                              <IconComponent className="w-3 h-3" />
                              <span>{sourceBadge.label}</span>
                            </span>
                            
                            {lead.company && (
                              <span className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-slate-50 text-slate-600 border border-slate-200/60 uppercase font-light flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{lead.company}</span>
                              </span>
                            )}
                          </div>

                          {/* Right: Date submitted */}
                          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {lead.createdAt?.seconds 
                              ? new Date(lead.createdAt.seconds * 1000).toLocaleString('es-ES', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Recién creado'
                            }
                          </span>

                        </div>

                        {/* Content Body */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
                          
                          {/* Left Column: Contact profile and messages */}
                          <div className="lg:col-span-8 space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Nombre Completo</p>
                              <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{lead.name}</h4>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Email de Contacto</p>
                              <a href={`mailto:${lead.email}`} className="text-xs font-mono font-medium text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" />
                                <span>{lead.email}</span>
                              </a>
                            </div>

                            {/* Conditional Message details based on source */}
                            {lead.source === 'contact_form' && (
                              <div className="space-y-2">
                                {lead.subject && (
                                  <div>
                                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Asunto del Mensaje</p>
                                    <p className="text-xs font-semibold text-slate-800 mt-0.5">{lead.subject}</p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Mensaje / Requerimientos</p>
                                  <p className="text-xs text-slate-700 font-light leading-relaxed mt-1 p-3 bg-slate-50/50 rounded-xl border border-slate-100 whitespace-pre-wrap italic">
                                    "{lead.message}"
                                  </p>
                                </div>
                              </div>
                            )}

                            {lead.source === 'lead_magnet' && (
                              <div>
                                <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Acción Realizada</p>
                                <p className="text-xs text-slate-600 font-light mt-1 flex items-center gap-1.5">
                                  <Check className="w-4 h-4 text-emerald-500" />
                                  <span>Descargó exitosamente la guía: <strong>"Enterprise Automation Blueprint"</strong>.</span>
                                </p>
                              </div>
                            )}

                            {lead.source === 'cotizador_audit' && (
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium">Problema o Cuello de Botella</p>
                                  <p className="text-xs text-slate-700 font-light leading-relaxed mt-1 p-3 bg-slate-50/50 rounded-xl border border-slate-100 italic">
                                    "{lead.message || 'No detalló cuello de botella.'}"
                                  </p>
                                </div>

                                {lead.calculatorData && (
                                  <div>
                                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest font-medium mb-1.5">Métricas de Cotización del Proyecto</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                      
                                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                        <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">INDUSTRIA</p>
                                        <p className="text-xs font-semibold text-slate-900 mt-0.5 uppercase font-mono">{lead.calculatorData.industry}</p>
                                      </div>

                                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                        <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">EQUIPO OPS</p>
                                        <p className="text-xs font-semibold text-slate-900 mt-0.5 font-mono">{lead.calculatorData.teamSize} personas</p>
                                      </div>

                                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                        <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">MANUALES / SEM</p>
                                        <p className="text-xs font-semibold text-slate-900 mt-0.5 font-mono">{lead.calculatorData.manualHoursPerWeek} hrs</p>
                                      </div>

                                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                        <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">COSTO / HORA</p>
                                        <p className="text-xs font-semibold text-slate-900 mt-0.5 font-mono">${lead.calculatorData.hourlyRate} USD</p>
                                      </div>

                                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100/60 text-center col-span-2 sm:col-span-1">
                                        <p className="text-[8px] font-mono text-emerald-800 uppercase tracking-widest font-bold">AHORRO EST.</p>
                                        <p className="text-xs font-bold text-emerald-700 mt-0.5 font-mono">${lead.calculatorData.estimatedSavings.toLocaleString()} /año</p>
                                      </div>

                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>

                          {/* Right Column: CRM Controls & Pipeline values */}
                          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                            
                            {/* Actions and Status dropdown */}
                            <div className="space-y-2">
                              <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400">
                                Estado del Lead
                              </label>
                              <div className="flex items-center gap-2">
                                <select 
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                  className="w-full px-3 py-2 rounded-xl border text-xs font-mono font-semibold uppercase tracking-wider bg-white border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-800 transition-all"
                                >
                                  <option value="new">🆕 NUEVO / SIN ATENDER</option>
                                  <option value="contacted">📞 CONTACTADO</option>
                                  <option value="negotiating">💼 EN NEGOCIACIÓN</option>
                                  <option value="closed">🤝 CERRADO (ÉXITO)</option>
                                  <option value="rejected">❌ RECHAZADO / ARCHIVADO</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  title="Eliminar Prospecto"
                                  className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all cursor-pointer shrink-0"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Display ROI highlight if any */}
                            {lead.calculatorData && (
                              <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100/60 space-y-1 text-emerald-950">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Oportunidad de Alto Valor</span>
                                </div>
                                <p className="text-xs text-slate-600 font-light leading-snug">
                                  Este cliente estima ahorrar <strong className="text-slate-900">${lead.calculatorData.estimatedSavings.toLocaleString()} USD</strong> al año liberando <strong className="text-slate-900">{lead.calculatorData.hoursSaved.toLocaleString()} horas</strong> manuales.
                                </p>
                              </div>
                            )}

                          </div>

                        </div>

                        {/* Expandable Notes Footer */}
                        <div className="mt-2 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
                              <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                              <span>Bitácora de Seguimiento Interno</span>
                            </span>
                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              disabled={savingNotesId === lead.id}
                              className="px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 bg-slate-50 hover:bg-slate-900 hover:text-white hover:border-slate-900 border border-slate-200 flex items-center gap-1"
                            >
                              {savingNotesId === lead.id ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin text-slate-800" />
                                  <span>Guardando...</span>
                                </>
                              ) : (
                                <>
                                  <Save className="w-3 h-3" />
                                  <span>Guardar Notas</span>
                                </>
                              )}
                            </button>
                          </div>
                          <textarea
                            value={localNotes[lead.id] ?? ''}
                            onChange={(e) => setLocalNotes({ ...localNotes, [lead.id]: e.target.value })}
                            placeholder="Anota aquí tus interacciones: Ej: 'Llamada agendada el lunes a las 10 AM. Presupuesto aproximado $2,500 USD...'"
                            className="w-full p-3 rounded-lg bg-slate-50/50 border border-slate-200/60 focus:outline-none focus:border-slate-800 focus:bg-white text-xs text-slate-800 placeholder-slate-400 font-light resize-y min-h-[60px]"
                          />
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab content 2: CMS VIEW */}
        {activeTab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Column */}
            <div className="lg:col-span-1">
              <div className="card-editorial p-6 space-y-5 bg-white/90 backdrop-blur-md sticky top-6">
                <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  {isEditing ? <Edit2 className="w-4 h-4 text-slate-700" /> : <Plus className="w-4 h-4 text-slate-700" />}
                  {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">Título</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">Descripción</label>
                    <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white h-24 placeholder-slate-400 transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">Etiquetas (separadas por coma)</label>
                    <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="React, Node.js, AWS" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">URL Enlace (Opcional)</label>
                    <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest font-bold text-slate-600 mb-1.5">URL Imagen (Opcional)</label>
                    <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="isVisible" checked={formData.isVisible} onChange={e => setFormData({...formData, isVisible: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer" />
                    <label htmlFor="isVisible" className="text-xs text-slate-600 font-light select-none cursor-pointer">Proyecto visible al público</label>
                  </div>
 
                  <div className="pt-4 flex gap-2">
                    <button type="submit" className="flex-1 btn-ios-dark py-2.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <Save className="w-3.5 h-3.5" /> 
                      <span>{isEditing ? 'Guardar' : 'Crear'}</span>
                    </button>
                    {isEditing && (
                      <button type="button" onClick={resetForm} className="btn-ios-secondary px-4 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-950 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer">
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
 
            {/* List Column */}
            <div className="lg:col-span-2">
              <div className="card-editorial p-6 space-y-4 bg-white/90 backdrop-blur-md min-h-[500px]">
                <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                  Tus Proyectos
                </h3>
                
                {loadingProjects ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-6 h-6 text-slate-700 animate-spin" />
                  </div>
                ) : projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-center">
                    <Globe className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-light">No tienes proyectos creados aún.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map(p => (
                      <div key={p.id} className={`flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border transition-colors ${p.isVisible ? 'border-slate-200/80 bg-white/50' : 'border-slate-100 bg-slate-50/50 opacity-60'}`}>
                        {p.imageUrl && (
                          <div className="w-full sm:w-28 h-20 rounded-xl bg-slate-100 border border-slate-200/40 overflow-hidden shrink-0">
                            <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className={`text-sm font-semibold ${p.isVisible ? 'text-slate-900 font-mono uppercase tracking-wide' : 'text-slate-500 font-mono uppercase tracking-wide'}`}>{p.title}</h4>
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => toggleVisibility(p)} title={p.isVisible ? "Ocultar" : "Mostrar"} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer">
                                {p.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              <button onClick={() => editProject(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteProject(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-light">{p.description}</p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {p.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-50 text-slate-500 border border-slate-200/60 uppercase">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
  
          </div>
        )}

        {/* Tab content 3: SECTIONS CONFIG VIEW */}
        {activeTab === 'sections' && (
          <div className="card-editorial p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-slate-200/60 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-900">
                  Visibilidad de Secciones en la Página Principal
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-light">
                  Configura qué partes del sitio web están visibles para los visitantes en tiempo real.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                Sincronización en la nube
              </span>
            </div>

            {loadingSections ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-6 h-6 text-slate-700 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'servicios',
                    title: 'Servicios Profesionales',
                    desc: 'Muestra u oculta la sección con las tarjetas de especialidades de automatización, backend y full-stack.',
                    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
                  },
                  {
                    key: 'leadMagnet',
                    title: 'Ebook / Lead Magnet',
                    desc: 'Sección para capturar correos con la descarga del "Enterprise Automation Blueprint".',
                    color: 'text-violet-600 bg-violet-50 border-violet-100',
                  },
                  {
                    key: 'proyectos',
                    title: 'Portafolio de Proyectos',
                    desc: 'Muestra u oculta la galería de tus proyectos de código real integrados con GitHub.',
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                  },
                  {
                    key: 'sobreMi',
                    title: 'Perfil de Presentación',
                    desc: 'Sección "Acerca de Mí" que describe tu filosofía de trabajo e historia profesional.',
                    color: 'text-amber-600 bg-amber-50 border-amber-100',
                  },
                  {
                    key: 'experiencia',
                    title: 'Experiencia Profesional',
                    desc: 'Línea de tiempo detallada de tus roles anteriores y trayectoria corporativa.',
                    color: 'text-blue-600 bg-blue-50 border-blue-100',
                  },
                  {
                    key: 'faqs',
                    title: 'Preguntas Frecuentes (FAQs)',
                    desc: 'Respuestas pre-redactadas sobre SLA, modalidad de pago, contratos e integraciones.',
                    color: 'text-rose-600 bg-rose-50 border-rose-100',
                  },
                  {
                    key: 'contacto',
                    title: 'Formulario de Contacto',
                    desc: 'Sección final del sitio con el formulario de envío directo para potenciales clientes.',
                    color: 'text-slate-600 bg-slate-50 border-slate-100',
                  },
                ].map((sec) => {
                  const isActive = sectionsConfig[sec.key as keyof SectionConfig];
                  return (
                    <div
                      key={sec.key}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 bg-white ${
                        isActive 
                          ? 'border-slate-200 shadow-2xs' 
                          : 'border-slate-100 opacity-60 bg-slate-50/40'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${sec.color}`}>
                            {sec.key}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 font-mono uppercase tracking-wide">
                            {sec.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
                          {sec.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-center">
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {isActive ? 'Activo' : 'Inactivo'}
                        </span>
                        
                        {/* Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggleSection(sec.key as keyof SectionConfig)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isActive ? 'bg-indigo-600' : 'bg-slate-200'
                          }`}
                          aria-label={`Toggle ${sec.title}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                              isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
