import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Lock, Mail, AlertCircle, CheckCircle2, Eye, EyeOff, ArrowRight, Zap, Shield, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/supabase";

const ROLE_REDIRECT: Record<UserRole, string> = {
  admin:     "/dashboard/admin",
  therapist: "/dashboard/therapist",
  patient:   "/dashboard/patient",
};

const Login = () => {
  const navigate  = useNavigate();
  const { role }  = useAuth();
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [error,      setError]      = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent,  setResetSent]  = useState(false);
  const [showPass,   setShowPass]   = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (role) navigate(ROLE_REDIRECT[role], { replace: true });

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetErr) setError(resetErr.message);
    else setResetSent(true);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) { setError(authError.message); setLoading(false); return; }
    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles").select("role").eq("id", data.user.id).single();
      const userRole = profile?.role as UserRole | undefined;
      navigate(userRole ? ROLE_REDIRECT[userRole] : "/", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "linear-gradient(135deg, hsl(220,40%,8%) 0%, hsl(200,50%,11%) 40%, hsl(175,60%,10%) 100%)", fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden", position: "relative" }}>

      {/* Animated background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, hsla(175,70%,32%,0.18) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-8%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, hsla(38,95%,52%,0.12) 0%, transparent 70%)", animation: "floatSlow 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", left: "30%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, hsla(185,65%,42%,0.1) 0%, transparent 70%)", animation: "float 12s ease-in-out infinite reverse" }} />
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(hsla(175,60%,60%,0.03) 1px, transparent 1px), linear-gradient(90deg, hsla(175,60%,60%,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Left panel - branding */}
      <div style={{ display: "none", flex: 1, flexDirection: "column", justifyContent: "center", padding: "3rem 4rem", position: "relative", zIndex: 10 }} className="login-left-panel">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, hsl(175,70%,28%), hsl(185,65%,42%))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px hsla(175,70%,40%,0.4)" }}>
              <Activity style={{ width: "22px", height: "22px", color: "white" }} />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>Expert Physio</span>
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: "1.25rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Transform Lives<br />
            <span style={{ background: "linear-gradient(135deg, hsl(175,70%,50%), hsl(38,95%,60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Through Movement</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "hsla(210,30%,85%,0.7)", lineHeight: 1.7, maxWidth: "380px" }}>
            The complete physiotherapy management platform — empowering practitioners and patients alike.
          </p>
        </div>
        {/* Feature pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {[
            { icon: <Zap style={{ width: "16px", height: "16px" }} />, text: "Real-time session tracking" },
            { icon: <Shield style={{ width: "16px", height: "16px" }} />, text: "HIPAA-compliant & secure" },
            { icon: <Heart style={{ width: "16px", height: "16px" }} />, text: "Patient-centred care dashboard" },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "hsla(175,60%,50%,0.12)", border: "1px solid hsla(175,60%,50%,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(175,70%,55%)" }}>{icon}</div>
              <span style={{ fontSize: "0.9rem", color: "hsla(210,30%,90%,0.75)" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", zIndex: 10 }}>
        <div style={{ width: "100%", maxWidth: "440px", animation: "fadeInUp 0.65s ease-out forwards" }}>

          {/* Logo mark (visible on all screens) */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <div className="animate-pulse-gentle" style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, hsl(175,70%,28%), hsl(185,65%,42%))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px hsla(175,70%,40%,0.45)" }}>
                <Activity style={{ width: "24px", height: "24px", color: "white" }} />
              </div>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", margin: 0, letterSpacing: "-0.02em" }}>Expert Physio Care</h2>
            <p style={{ fontSize: "0.875rem", color: "hsla(210,30%,85%,0.55)", marginTop: "0.35rem" }}>
              {forgotMode ? "Reset your password" : "Sign in to your dashboard"}
            </p>
          </div>

          {/* Glass card */}
          <div style={{ background: "hsla(220,35%,14%,0.65)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid hsla(175,60%,60%,0.12)", borderRadius: "24px", padding: "2.25rem 2rem", boxShadow: "0 24px 64px -12px hsla(175,60%,10%,0.7), inset 0 1px 0 hsla(175,60%,80%,0.08)" }}>

            {forgotMode ? (
              resetSent ? (
                /* Reset sent state */
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, hsl(142,70%,30%), hsl(142,60%,42%))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 0 32px hsla(142,70%,40%,0.4)" }}>
                    <CheckCircle2 style={{ width: "30px", height: "30px", color: "white" }} />
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "white", margin: "0 0 0.6rem" }}>Check your inbox!</h3>
                  <p style={{ fontSize: "0.875rem", color: "hsla(210,30%,85%,0.6)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                    We sent a reset link to <strong style={{ color: "hsl(175,70%,55%)" }}>{email}</strong>.<br />Click it to set a new password.
                  </p>
                  <button onClick={() => { setForgotMode(false); setResetSent(false); }} style={ghostBtnStyle}>
                    ← Back to Login
                  </button>
                </div>
              ) : (
                /* Forgot password form */
                <form onSubmit={handleForgot} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "hsla(210,30%,85%,0.6)", margin: 0 }}>Enter your email and we'll send you a reset link.</p>
                  <FloatingInput
                    id="reset-email" type="email" label="Email address" placeholder="you@expertphysio.com"
                    icon={<Mail style={{ width: "16px", height: "16px" }} />}
                    value={email} onChange={setEmail}
                    focused={focusedField === "reset-email"}
                    onFocus={() => setFocusedField("reset-email")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {error && <ErrorBanner message={error} />}
                  <PrimaryButton loading={loading} loadingText="Sending…" text="Send Reset Link" />
                  <button type="button" onClick={() => { setForgotMode(false); setError(null); }} style={ghostBtnStyle}>
                    ← Back to Login
                  </button>
                </form>
              )
            ) : (
              /* Login form */
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <FloatingInput
                  id="login-email" type="email" label="Email address" placeholder="you@expertphysio.com"
                  icon={<Mail style={{ width: "16px", height: "16px" }} />}
                  value={email} onChange={setEmail}
                  focused={focusedField === "login-email"}
                  onFocus={() => setFocusedField("login-email")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email"
                />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "hsla(210,30%,90%,0.7)", letterSpacing: "0.03em", textTransform: "uppercase" }}>Password</label>
                    <button type="button" onClick={() => { setForgotMode(true); setError(null); }}
                      style={{ fontSize: "0.8rem", color: "hsl(175,70%,55%)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focusedField === "login-pass" ? "hsl(175,70%,55%)" : "hsla(210,30%,70%,0.5)", transition: "color 0.2s", pointerEvents: "none" }}>
                      <Lock style={{ width: "16px", height: "16px" }} />
                    </div>
                    <input
                      id="login-pass" type={showPass ? "text" : "password"} placeholder="••••••••"
                      value={password} onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("login-pass")} onBlur={() => setFocusedField(null)}
                      autoComplete="current-password" required
                      style={{ ...inputStyle, paddingLeft: "42px", paddingRight: "42px", borderColor: focusedField === "login-pass" ? "hsl(175,70%,40%)" : "hsla(175,60%,60%,0.12)", boxShadow: focusedField === "login-pass" ? "0 0 0 3px hsla(175,70%,40%,0.15)" : "none" }}
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsla(210,30%,70%,0.5)", padding: 0, display: "flex" }}>
                      {showPass ? <EyeOff style={{ width: "16px", height: "16px" }} /> : <Eye style={{ width: "16px", height: "16px" }} />}
                    </button>
                  </div>
                </div>

                {error && <ErrorBanner message={error} />}

                <PrimaryButton loading={loading} loadingText="Signing in…" text="Sign In" />
              </form>
            )}
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.78rem", color: "hsla(210,30%,80%,0.35)" }}>
            © {new Date().getFullYear()} Expert Physio Care. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .login-left-panel { display: flex !important; }
        }
        input::placeholder { color: hsla(210,30%,70%,0.35); }
        input:focus { outline: none; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px hsl(220,35%,16%) inset !important;
          -webkit-text-fill-color: white !important;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(4deg); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-gentle {
          0%, 100% { box-shadow: 0 0 0 0 hsla(175,70%,40%,0.4), 0 0 32px hsla(175,70%,40%,0.45); }
          50%       { box-shadow: 0 0 0 10px hsla(175,70%,40%,0), 0 0 40px hsla(175,70%,40%,0.6); }
        }
        .animate-pulse-gentle { animation: pulse-gentle 2.5s infinite; }
      `}</style>
    </div>
  );
};

/* ── Sub-components ── */

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  padding: "0.75rem 0.875rem",
  background: "hsla(220,35%,10%,0.5)",
  border: "1px solid hsla(175,60%,60%,0.12)",
  borderRadius: "12px",
  color: "white",
  fontSize: "0.9rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const ghostBtnStyle: React.CSSProperties = {
  width: "100%", padding: "0.7rem",
  background: "hsla(175,60%,50%,0.06)",
  border: "1px solid hsla(175,60%,50%,0.12)",
  borderRadius: "12px",
  color: "hsla(210,30%,85%,0.65)",
  fontSize: "0.875rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s",
};

const FloatingInput = ({ id, type, label, placeholder, icon, value, onChange, focused, onFocus, onBlur, autoComplete }: {
  id: string; type: string; label: string; placeholder: string;
  icon: React.ReactNode; value: string; onChange: (v: string) => void;
  focused: boolean; onFocus: () => void; onBlur: () => void; autoComplete?: string;
}) => (
  <div>
    <label htmlFor={id} style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "hsla(210,30%,90%,0.7)", marginBottom: "0.5rem", letterSpacing: "0.03em", textTransform: "uppercase" }}>{label}</label>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focused ? "hsl(175,70%,55%)" : "hsla(210,30%,70%,0.5)", transition: "color 0.2s", pointerEvents: "none" }}>{icon}</div>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        onFocus={onFocus} onBlur={onBlur} autoComplete={autoComplete} required
        style={{ ...inputStyle, paddingLeft: "42px", borderColor: focused ? "hsl(175,70%,40%)" : "hsla(175,60%,60%,0.12)", boxShadow: focused ? "0 0 0 3px hsla(175,70%,40%,0.15)" : "none" }}
      />
    </div>
  </div>
);

const PrimaryButton = ({ loading, loadingText, text }: { loading: boolean; loadingText: string; text: string }) => (
  <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.85rem 1.5rem", background: loading ? "hsla(175,60%,30%,0.5)" : "linear-gradient(135deg, hsl(175,70%,28%) 0%, hsl(185,65%,38%) 100%)", border: "none", borderRadius: "12px", color: "white", fontSize: "0.95rem", fontWeight: 600, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "opacity 0.2s, box-shadow 0.2s", boxShadow: loading ? "none" : "0 4px 20px hsla(175,70%,30%,0.45)", letterSpacing: "-0.01em" }}>
    {loading ? (
      <><div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />{loadingText}</>
    ) : (
      <>{text}<ArrowRight style={{ width: "16px", height: "16px" }} /></>
    )}
  </button>
);

const ErrorBanner = ({ message }: { message: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", padding: "0.75rem 1rem", borderRadius: "10px", background: "hsla(0,84%,60%,0.1)", border: "1px solid hsla(0,84%,60%,0.2)", color: "hsl(0,84%,70%)", fontSize: "0.85rem" }}>
    <AlertCircle style={{ width: "15px", height: "15px", marginTop: "1px", flexShrink: 0 }} />
    <span>{message}</span>
  </div>
);

export default Login;
