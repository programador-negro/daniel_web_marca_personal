import React, { useState, useEffect } from 'react';
import { 
  Settings, Lock, ArrowLeft, LogOut, Plus, Edit2, Trash2, 
  Globe, Eye, EyeOff, Save, Loader2, AlertCircle, Mail, Key
} from 'lucide-react';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { 
  signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { 
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp 
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
    if (user && user.email === 'daniel.ibarra.dev@gmail.com') {
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

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== 'daniel.ibarra.dev@gmail.com') {
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
      if (result.user.email !== 'daniel.ibarra.dev@gmail.com') {
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
  if (!user || user.email !== 'daniel.ibarra.dev@gmail.com') {
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
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
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
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
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

  // --- CMS DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#fbfbfb] bg-noise text-slate-900 p-4 sm:p-8 font-sans selection:bg-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between card-editorial p-6 gap-4 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-light text-slate-900 tracking-wider uppercase font-mono flex items-center gap-2">
                Gestor de Portafolio
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold uppercase tracking-wider">
                  CMS Activo
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Administra tus proyectos y servicios de danielib.com en tiempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="btn-ios-secondary flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:text-slate-950 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer">
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
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">Título</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">Descripción</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white h-24 placeholder-slate-400 transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">Etiquetas (separadas por coma)</label>
                  <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="React, Node.js, AWS" className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">URL Enlace (Opcional)</label>
                  <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-950 text-xs focus:outline-none focus:border-slate-800 focus:bg-white placeholder-slate-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400 mb-1.5">URL Imagen (Opcional)</label>
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

      </div>
    </div>
  );
};
