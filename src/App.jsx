import { useState, useEffect, useRef } from "react";
import React from "react";
// ─── Datos iniciales goleadoras (pre-cargadas desde xlsx) ──────────────────
const INITIAL_SCORERS = [{"name":"Carnevali, Oriana","team":"U. LA PLATA","goals":5,"pc":0},{"name":"Cairo, Sofia","team":"M. MORENO","goals":4,"pc":0},{"name":"Castiglione Corvalan, Guadalupe","team":"C.A.S.I.","goals":4,"pc":0},{"name":"Gluch, Carolina","team":"MACABI","goals":4,"pc":0},{"name":"Ravetta, Lara","team":"M. GRANDE","goals":4,"pc":0},{"name":"Seoane, Tiziana","team":"PUERTO NIZUC","goals":4,"pc":0},{"name":"Curri, Manuela","team":"M. MORENO","goals":3,"pc":0},{"name":"Dimarco, Mia","team":"PUERTO NIZUC","goals":3,"pc":0},{"name":"Fernandez, Sol","team":"M. MORENO","goals":3,"pc":0},{"name":"Galleano, Valentina","team":"PUCARA","goals":3,"pc":0},{"name":"Pastorelli, Martina Sol","team":"M. MORENO","goals":3,"pc":0},{"name":"Rodriguez, Macarena","team":"PUERTO NIZUC","goals":3,"pc":0},{"name":"Basini, Renata","team":"C.A.S.I.","goals":2,"pc":0},{"name":"Bravo, Lucila Malena","team":"B. HIPOTECARIO","goals":2,"pc":0},{"name":"Cuitiño Christin, Melisa","team":"BANCO CIUDAD","goals":2,"pc":0},{"name":"Febles Tripori, Luna Rocio","team":"LANUS","goals":2,"pc":0},{"name":"Fernandez, Juana","team":"HINDU CLUB","goals":2,"pc":0},{"name":"Gamarra, Milagros","team":"PUCARA","goals":2,"pc":0},{"name":"Gluch, Julieta","team":"MACABI","goals":2,"pc":0},{"name":"Gomez, Rocio Jazmin","team":"LANUS","goals":2,"pc":0},{"name":"Landolfi, Agustina","team":"BANCO CIUDAD","goals":2,"pc":0},{"name":"Moore Castelli, Camila","team":"U. LA PLATA","goals":2,"pc":0},{"name":"Semcheff, Sofia Agustina","team":"CIUDAD","goals":2,"pc":0},{"name":"Sosa, Milagros","team":"BANFIELD","goals":2,"pc":0},{"name":"Villarmea, Julieta","team":"B. HIPOTECARIO","goals":2,"pc":0},{"name":"Vullo, Lucía","team":"BANCO CIUDAD","goals":2,"pc":0},{"name":"Arouxet, Juana","team":"C.I.S.S.A.B.","goals":2,"pc":0},{"name":"Olivetto, Clara","team":"M. MORENO","goals":2,"pc":0},{"name":"Holmgren, Trinidad","team":"C.A.S.I.","goals":2,"pc":0},{"name":"Jara, Milagros","team":"PUERTO NIZUC","goals":2,"pc":0},{"name":"Abate, Agustina Manon","team":"LANUS","goals":1,"pc":0},{"name":"Almaso, Candela","team":"U. LA PLATA","goals":1,"pc":0},{"name":"Alvarez, Morena","team":"U. LA PLATA","goals":1,"pc":0},{"name":"Berger, Victoria","team":"U. LA PLATA","goals":1,"pc":0},{"name":"Burman, Julieta","team":"M. MORENO","goals":1,"pc":0},{"name":"Canzobre, Martina","team":"PUCARA","goals":1,"pc":0},{"name":"Capalbo, Mercedes","team":"HINDU CLUB","goals":1,"pc":0},{"name":"Dominguez Velazco, Justina","team":"U. LA PLATA","goals":1,"pc":0},{"name":"Durante, Pilar","team":"U. LA PLATA","goals":1,"pc":0},{"name":"Etcheverry, Ines","team":"C.A.S.I.","goals":1,"pc":0},{"name":"Fernandez, Bernardita","team":"HINDU CLUB","goals":1,"pc":0},{"name":"Franco, Adriana Raquel","team":"M. MORENO","goals":1,"pc":0},{"name":"Galleano, Candela","team":"PUCARA","goals":1,"pc":0},{"name":"Gomez Lagrenade, Violeta","team":"PUCARA","goals":1,"pc":0},{"name":"Gutierrez, Agustina Aylen","team":"B. HIPOTECARIO","goals":1,"pc":0},{"name":"Hileman, J Belen","team":"C.A.S.I.","goals":1,"pc":0},{"name":"Kaufman, Nicole","team":"MACABI","goals":1,"pc":0},{"name":"Lopez, Delfina","team":"B. HIPOTECARIO","goals":1,"pc":0},{"name":"Lucini, Martina","team":"CIUDAD","goals":1,"pc":0},{"name":"Luis, Lourdes Rocio","team":"M. GRANDE","goals":1,"pc":0},{"name":"Mattiazzi, Juana","team":"M. MORENO","goals":1,"pc":0},{"name":"Muñoz, Candela","team":"PUCARA","goals":1,"pc":0},{"name":"Murgo, Anabella","team":"CIUDAD","goals":1,"pc":0},{"name":"Pazo, Mariana","team":"PUCARA","goals":1,"pc":0},{"name":"Sapir, Sofía","team":"MACABI","goals":1,"pc":0},{"name":"Tandeitnic, Luana","team":"MACABI","goals":1,"pc":0},{"name":"Testone, Valentina","team":"LANUS","goals":1,"pc":0},{"name":"Torreiro, Maria Pilar","team":"LANUS","goals":1,"pc":0},{"name":"Camporotondo, Delfina","team":"PUERTO NIZUC","goals":1,"pc":0},{"name":"Fernandez Rubio, Agostina","team":"BANFIELD","goals":1,"pc":0},{"name":"Garcia Larralde, Julieta","team":"M. GRANDE","goals":1,"pc":0},{"name":"Grane, Juana","team":"HINDU CLUB","goals":1,"pc":0},{"name":"Ruiz, Valentina","team":"LANUS","goals":1,"pc":0},{"name":"Uranga Imaz, Juana","team":"C.A.S.I.","goals":1,"pc":0},{"name":"Witlis, Morena","team":"MACABI","goals":1,"pc":0}];
// ─── Supabase (base de datos compartida) ─────────────────────────────────────
const SUPABASE_URL = "https://utmhpacgzfegtulxrouq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bWhwYWNnemZlZ3R1bHhyb3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjczMzksImV4cCI6MjA5MjU0MzMzOX0.TrAuORDJO27ZxbpL5BGAzItO0yaf-Fxtvq6ApJ1oyPk";
const KEYS = { rivals:"culp:rivals", standings:"culp:standings", scorers:"culp:scorers", seeded:"culp:seeded", fixture:"culp:fixture", cards:"culp:cards" };
async function load(key) {
  try {
    const res = await fetch(SUPABASE_URL + "/rest/v1/culp_data?key=eq." + encodeURIComponent(key) + "&select=value", {
      headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return JSON.parse(data[0].value);
    return null;
  } catch { return null; }
}
async function save(key, val) {
  try {
    const res = await fetch(SUPABASE_URL + "/rest/v1/culp_data", {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify({ key, value: JSON.stringify(val) })
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase save error:", res.status, err);
    }
  } catch(e) { console.error("Save exception:", e); }
}
// ─── Claude API (acepta imágenes Y PDFs) ─────────────────────────────────────
const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
async function scanPlanilla(base64, mediaType, isPdf) {
  if (!ANTHROPIC_KEY) {
    throw new Error("Falta configurar la API key de Anthropic. Andá a Vercel → Settings → Environment Variables y agregá VITE_ANTHROPIC_API_KEY.");
  }
  const system = `Sos un asistente de análisis de hockey sobre césped. Extraé datos de planillas de partidos (pueden venir en PDF oficial o foto de planilla manual).
Respondé SOLO con un objeto JSON válido, sin texto adicional, sin markdown, sin backticks.
Estructura exacta:
{"equipoLocal":"nombre","equipoVisitante":"nombre","golesLocal":0,"golesVisitante":0,"fecha":"YYYY-MM-DD o vacío","goleadoras":[{"nombre":"Apellido, Nombre","equipo":"local|visitante","minuto":"","tipo":"gol|pc"}],"cornersLocal":0,"cornersVisitante":0,"tarjetas":[{"nombre":"Apellido, Nombre","equipo":"local|visitante","tipo":"verde|amarilla|roja","minuto":""}],"jugadorasLocal":["Apellido, Nombre"],"jugadorasVisitante":["Apellido, Nombre"],"notas":""}
Reglas:
- Los nombres siempre en formato "Apellido, Nombre" (respetá como aparece en la planilla).
- Si un campo no aparece, usá valor vacío "" o 0. Nunca inventes datos.
- Las tarjetas verdes son 2 minutos, amarillas 5 minutos, rojas expulsión.
- Si la planilla dice "PC" o "penalty corner", es tipo "pc". Si dice "gol de juego" o no aclara, es "gol".`;
  const fileBlock = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } };
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system,
        messages: [{ role: "user", content: [fileBlock, { type: "text", text: "Extraé todos los datos de esta planilla de hockey." }] }]
      })
    });
  } catch (networkErr) {
    throw new Error("Error de red al conectar con la API. Revisá tu conexión.");
  }
  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("API key inválida o vencida. Revisá VITE_ANTHROPIC_API_KEY en Vercel.");
    if (res.status === 429) throw new Error("Llegaste al límite de uso. Esperá un momento o revisá tus créditos en console.anthropic.com.");
    if (res.status === 400 && errTxt.includes("credit")) throw new Error("Sin créditos en la cuenta de Anthropic. Agregá método de pago en console.anthropic.com.");
    throw new Error(`Error API (${res.status}): ${errTxt.substring(0, 150) || "desconocido"}`);
  }
  const data = await res.json();
  const text = data.content?.find(b => b.type === "text")?.text || "";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    throw new Error("No se pudo interpretar la respuesta. Probá con un archivo más claro.");
  }
}
// ─── Icons ────────────────────────────────────────────────────────────────────
const P = {
  home:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  plus:"M12 5v14M5 12h14",
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  trophy:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  chart:"M18 20V10 M12 20V4 M6 20v-6",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  back:"M19 12H5 M12 19l-7-7 7-7",
  check:"M20 6L9 17l-5-5",
  upload:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  scan:"M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  save:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8",
  x:"M18 6L6 18 M6 6l12 12",
  flag:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  corner:"M15 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9 M18 3l3 3-3 3 M21 6H9",
  image:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  filter:"M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  camera:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  calendar:"M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
  chevron:"M6 9l6 6 6-6",
};
const Icon = ({name,size=18,color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {(P[name]||"").split(" M").map((d,i)=><path key={i} d={i===0?d:"M"+d}/>)}
  </svg>
);
// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {bg:"#080810",card:"#11111C",card2:"#181826",border:"#252535",accent:"#00C8FF",purple:"#7B2FBE",red:"#FF4D6D",green:"#4ade80",gold:"#FFD700",gray:"#7777AA",white:"#FFFFFF"};
const inp = {background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.white,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none"};
const FF = "'Barlow Condensed',sans-serif";
// ─── UI ───────────────────────────────────────────────────────────────────────
const Input=({label,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<input style={inp} {...p}/></div>);
const Select=({label,options,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<select style={{...inp,cursor:"pointer"}} {...p}>{options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}</select></div>);
const Textarea=({label,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<textarea style={{...inp,minHeight:72,resize:"vertical"}} {...p}/></div>);
const Btn=({children,onClick,color=C.accent,outline=false,small=false,danger=false,disabled=false,style:sx={}})=>{
  const bg=danger?C.red:color;
  return <button onClick={onClick} disabled={disabled} style={{background:outline?"transparent":(disabled?C.border:bg),border:`1px solid ${disabled?C.border:bg}`,color:outline?bg:C.white,borderRadius:8,padding:small?"6px 12px":"10px 20px",fontSize:small?12:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:6,letterSpacing:0.3,fontFamily:FF,opacity:disabled?0.5:1,transition:"all 0.15s",...sx}}>{children}</button>;
};
const Badge=({text,color=C.accent})=>(<span style={{background:color+"22",color,border:`1px solid ${color}44`,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:0.5}}>{text}</span>);
const Modal=({title,onClose,children,wide=false})=>(
  <div style={{position:"fixed",inset:0,background:"#000000DD",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:wide?720:560,maxHeight:"92vh",overflowY:"auto",padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:18,color:C.white,fontFamily:FF,letterSpacing:1}}>{title}</h2>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="x" size={20}/></button>
      </div>
      {children}
    </div>
  </div>
);
const SCard=({title,color=C.accent,icon,children})=>(
  <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:12}}>
    {title&&<div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>{icon&&<Icon name={icon} size={13} color={color}/>}<span style={{color,fontSize:11,fontWeight:700,fontFamily:FF,letterSpacing:1}}>{title.toUpperCase()}</span></div>}
    {children}
  </div>
);
// ═══════════════════════════════════════════════════════════════════════════════
// PLANILLA IMPORTER — 3 modos: IA (PDF/foto), Manual (form vacío), Review (post-IA)
// ═══════════════════════════════════════════════════════════════════════════════
const EMPTY_PLANILLA = () => ({
  equipoLocal:"U. LA PLATA", equipoVisitante:"", golesLocal:0, golesVisitante:0,
  fecha:new Date().toISOString().split("T")[0],
  goleadoras:[], cornersLocal:0, cornersVisitante:0,
  tarjetas:[], jugadorasLocal:[], jugadorasVisitante:[], notas:""
});
function PlanillaScanner({rivalName,onApply,onClose,mode="scan"}) {
  const [stage,setStage]=useState(mode==="manual"?"review":"upload");
  const [preview,setPreview]=useState(null);
  const [b64,setB64]=useState(null);
  const [mtype,setMtype]=useState("image/jpeg");
  const [fileName,setFileName]=useState("");
  const [isPdf,setIsPdf]=useState(false);
  const [result,setResult]=useState(mode==="manual"?{...EMPTY_PLANILLA(),equipoVisitante:rivalName||""}:null);
  const [error,setError]=useState("");
  const fileRef=useRef();
  const cameraRef=useRef();
  function handleFile(file) {
    if(!file) return;
    const isPdfFile = file.type==="application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImageFile = file.type.startsWith("image/");
    if(!isPdfFile && !isImageFile) {
      setError("Formato no soportado. Usá PDF, JPG, PNG o WEBP.");
      setStage("error");
      return;
    }
    // Límite de tamaño: 32 MB (Anthropic acepta PDFs hasta 32MB en base64)
    if(file.size > 32*1024*1024) {
      setError("El archivo es muy grande (máx 32 MB). Probá con una versión más liviana.");
      setStage("error");
      return;
    }
    setIsPdf(isPdfFile);
    setMtype(isPdfFile ? "application/pdf" : file.type);
    setFileName(file.name);
    const reader=new FileReader();
    reader.onload=e=>{
      const d=e.target.result;
      if(isPdfFile) {
        setPreview(null);
      } else {
        setPreview(d);
      }
      setB64(d.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }
  async function scan() {
    setStage("scanning");
    try { const d=await scanPlanilla(b64,mtype,isPdf); setResult(JSON.parse(JSON.stringify(d))); setStage("review"); }
    catch(err) { setError(err.message); setStage("error"); }
  }
  function resetUpload() {
    setB64(null); setPreview(null); setFileName(""); setIsPdf(false); setStage("upload");
  }
  const cardColor=t=>t==="verde"?C.green:t==="amarilla"?C.gold:C.red;
  return (
    <Modal title="📄 Importar Planilla" onClose={onClose} wide>
      {stage==="upload"&&(
        <div>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 16px"}}>Subí el <b style={{color:C.white}}>PDF oficial</b> o una <b style={{color:C.white}}>foto de la planilla</b>. Claude extrae todo automáticamente: goles, goleadoras, tarjetas y jugadoras.</p>
          <div onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()}
            onClick={()=>!b64&&fileRef.current.click()}
            style={{border:`2px dashed ${b64?C.accent:C.border}`,borderRadius:12,padding:b64?16:32,textAlign:"center",cursor:b64?"default":"pointer",background:C.card2,minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            {b64?(
              <div style={{width:"100%"}}>
                {isPdf?(
                  <div style={{padding:"20px 10px",textAlign:"center"}}>
                    <div style={{width:70,height:84,margin:"0 auto 12px",background:C.red+"15",border:`2px solid ${C.red}55`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}>
                      <Icon name="file" size={28} color={C.red}/>
                      <span style={{color:C.red,fontSize:9,fontWeight:700,letterSpacing:0.5}}>PDF</span>
                    </div>
                    <p style={{color:C.white,fontWeight:700,margin:"0 0 4px",fontSize:14,wordBreak:"break-word"}}>{fileName}</p>
                    <p style={{color:C.gray,fontSize:12,margin:0}}>Listo para analizar con IA</p>
                  </div>
                ):(
                  <img src={preview} alt="planilla" style={{maxWidth:"100%",maxHeight:280,objectFit:"contain",borderRadius:8}}/>
                )}
                <div style={{display:"flex",justifyContent:"center",marginTop:12}}>
                  <Btn small outline onClick={e=>{e.stopPropagation();resetUpload();}}><Icon name="x" size={12}/> Cambiar archivo</Btn>
                </div>
              </div>
            ):(
              <>
                <Icon name="upload" size={40} color={C.border}/>
                <p style={{color:C.white,margin:"12px 0 4px",fontSize:15,fontWeight:600}}>Arrastrá o hacé clic</p>
                <p style={{color:C.gray,margin:"0 0 14px",fontSize:12}}>PDF · JPG · PNG · WEBP (máx 32 MB)</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                  <Btn small outline onClick={e=>{e.stopPropagation();fileRef.current.click();}}><Icon name="upload" size={12}/> Subir archivo</Btn>
                  <Btn small outline onClick={e=>{e.stopPropagation();cameraRef.current.click();}} color={C.purple}><Icon name="camera" size={12}/> Tomar foto</Btn>
                </div>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*,application/pdf,.pdf" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          {!ANTHROPIC_KEY&&<div style={{marginTop:12,background:C.gold+"15",border:`1px solid ${C.gold}44`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.gold,display:"flex",alignItems:"center",gap:8}}><span>⚠️</span><span>Aún no configuraste <code style={{background:"#0004",padding:"1px 5px",borderRadius:3}}>VITE_ANTHROPIC_API_KEY</code> en Vercel. Sin esa variable no puede analizar los archivos.</span></div>}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
            <Btn outline onClick={onClose}>Cancelar</Btn>
            <Btn onClick={scan} disabled={!b64} color={C.purple}><Icon name="scan" size={14}/> Analizar con IA</Btn>
          </div>
        </div>
      )}
      {stage==="scanning"&&(
        <div style={{textAlign:"center",padding:"48px 20px"}}>
          <div style={{width:64,height:64,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.purple}`,borderRadius:"50%",margin:"0 auto 20px",animation:"spin 1s linear infinite"}}/>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{color:C.white,fontSize:16,fontFamily:FF,letterSpacing:1,margin:"0 0 8px"}}>ANALIZANDO PLANILLA...</p>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 4px"}}>Claude está leyendo los datos del partido</p>
          <p style={{color:C.border,fontSize:11,margin:0}}>Puede tardar 10–30 segundos</p>
          {isPdf?(
            <div style={{margin:"20px auto 0",display:"flex",alignItems:"center",gap:10,background:C.card2,padding:"10px 14px",borderRadius:8,maxWidth:280,opacity:0.6}}>
              <Icon name="file" size={20} color={C.red}/>
              <span style={{color:C.gray,fontSize:12,wordBreak:"break-word"}}>{fileName}</span>
            </div>
          ):(preview&&<img src={preview} alt="" style={{maxWidth:240,maxHeight:140,objectFit:"contain",borderRadius:8,marginTop:20,opacity:0.4}}/>)}
        </div>
      )}
      {stage==="error"&&(
        <div style={{textAlign:"center",padding:"32px 20px"}}>
          <Icon name="x" size={48} color={C.red}/>
          <p style={{color:C.red,fontSize:16,margin:"12px 0 8px",fontFamily:FF}}>NO SE PUDO IMPORTAR</p>
          <p style={{color:C.gray,fontSize:13,margin:"0 auto 20px",maxWidth:400}}>{error}</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn outline onClick={resetUpload}><Icon name="upload" size={14}/> Intentar de nuevo</Btn>
            <Btn outline onClick={onClose}>Cancelar</Btn>
          </div>
        </div>
      )}
      {stage==="review"&&result&&(
        <div>
          <div style={{background:C.green+"15",border:`1px solid ${C.green}33`,borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <Icon name="check" size={14} color={C.green}/>
            <span style={{color:C.green,fontSize:13,fontWeight:600}}>Planilla leída. Revisá y corregí antes de aplicar.</span>
          </div>
          <SCard title="Resultado" icon="chart" color={C.accent}>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"flex-end",marginBottom:12}}>
              <Input label="Equipo local" value={result.equipoLocal} onChange={e=>setResult(r=>({...r,equipoLocal:e.target.value}))}/>
              <div style={{paddingBottom:12,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.gray,letterSpacing:0.8,marginBottom:6}}>RESULTADO</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <input type="number" min={0} value={result.golesLocal} onChange={e=>setResult(r=>({...r,golesLocal:+e.target.value}))} style={{...inp,width:52,textAlign:"center",fontSize:22,fontWeight:700,padding:"6px 4px"}}/>
                  <span style={{color:C.gray,fontSize:20}}>—</span>
                  <input type="number" min={0} value={result.golesVisitante} onChange={e=>setResult(r=>({...r,golesVisitante:+e.target.value}))} style={{...inp,width:52,textAlign:"center",fontSize:22,fontWeight:700,padding:"6px 4px"}}/>
                </div>
              </div>
              <Input label="Equipo visitante" value={result.equipoVisitante} onChange={e=>setResult(r=>({...r,equipoVisitante:e.target.value}))}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <Input label="Fecha" type="date" value={result.fecha} onChange={e=>setResult(r=>({...r,fecha:e.target.value}))}/>
              <Input label="PC local" type="number" min={0} value={result.cornersLocal} onChange={e=>setResult(r=>({...r,cornersLocal:+e.target.value}))}/>
              <Input label="PC visitante" type="number" min={0} value={result.cornersVisitante} onChange={e=>setResult(r=>({...r,cornersVisitante:+e.target.value}))}/>
            </div>
          </SCard>
          <SCard title={`Goleadoras (${result.goleadoras?.length||0})`} icon="trophy" color={C.gold}>
            {(!result.goleadoras||result.goleadoras.length===0)&&<p style={{color:C.gray,fontSize:13,margin:0}}>No se detectaron goles</p>}
            {result.goleadoras?.map((g,i)=>(
              <div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
                <input style={{...inp,flex:2}} placeholder="Nombre" value={g.nombre} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],nombre:e.target.value};return{...r,goleadoras:a};})}/>
                <select style={{...inp,flex:1}} value={g.equipo} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],equipo:e.target.value};return{...r,goleadoras:a};})}><option value="local">Local</option><option value="visitante">Visitante</option></select>
                <input style={{...inp,flex:1,maxWidth:70}} placeholder="Min" value={g.minuto} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],minuto:e.target.value};return{...r,goleadoras:a};})}/>
                <select style={{...inp,flex:1,maxWidth:80}} value={g.tipo} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],tipo:e.target.value};return{...r,goleadoras:a};})}><option value="gol">Gol</option><option value="pc">PC</option></select>
                <button onClick={()=>setResult(r=>({...r,goleadoras:r.goleadoras.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="x" size={14}/></button>
              </div>
            ))}
            <Btn small outline onClick={()=>setResult(r=>({...r,goleadoras:[...(r.goleadoras||[]),{nombre:"",equipo:"local",minuto:"",tipo:"gol"}]}))}><Icon name="plus" size={12}/> Agregar</Btn>
          </SCard>
          {result.tarjetas?.length>0&&(
            <SCard title={`Tarjetas (${result.tarjetas.length})`} icon="flag" color={C.red}>
              {result.tarjetas.map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{width:10,height:14,background:cardColor(t.tipo),borderRadius:2,flexShrink:0}}/>
                  <span style={{color:C.white,fontSize:13,flex:1}}>{t.nombre}</span>
                  <span style={{color:C.gray,fontSize:12}}>{t.equipo} · min {t.minuto}</span>
                  <Badge text={t.tipo.toUpperCase()} color={cardColor(t.tipo)}/>
                </div>
              ))}
            </SCard>
          )}
          {(result.jugadorasLocal?.length>0||result.jugadorasVisitante?.length>0)&&(
            <SCard title="Jugadoras detectadas" icon="users" color={C.purple}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {result.jugadorasLocal?.length>0&&<div><p style={{color:C.accent,fontSize:10,margin:"0 0 6px",letterSpacing:0.8}}>{result.equipoLocal?.toUpperCase()||"LOCAL"}</p>{result.jugadorasLocal.map((j,i)=><div key={i} style={{color:C.gray,fontSize:12,padding:"2px 0"}}>· {j}</div>)}</div>}
                {result.jugadorasVisitante?.length>0&&<div><p style={{color:C.red,fontSize:10,margin:"0 0 6px",letterSpacing:0.8}}>{result.equipoVisitante?.toUpperCase()||"VISITANTE"}</p>{result.jugadorasVisitante.map((j,i)=><div key={i} style={{color:C.gray,fontSize:12,padding:"2px 0"}}>· {j}</div>)}</div>}
              </div>
            </SCard>
          )}
          {result.notas&&<SCard title="Notas" color={C.gray}><p style={{color:C.gray,fontSize:13,margin:0}}>{result.notas}</p></SCard>}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8,flexWrap:"wrap"}}>
            <Btn outline onClick={resetUpload}><Icon name="upload" size={14}/> Otro archivo</Btn>
            <Btn onClick={()=>{onApply(result);onClose();}} color={C.green}><Icon name="check" size={14}/> Aplicar al análisis</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// STANDINGS
// ═══════════════════════════════════════════════════════════════════════════════
function StandingsView({standings,setStandings}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const empty={name:"",pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,isUs:false};
  const submit=()=>{
    const pts=+form.pg*3+(+form.pe),dif=+form.gf-+form.gc;
    const entry={...form,pts,dif,pj:+form.pj,pg:+form.pg,pe:+form.pe,pp:+form.pp,gf:+form.gf,gc:+form.gc};
    const s=editIdx!==null?standings.map((x,i)=>i===editIdx?entry:x):[...standings,entry];
    const sorted=[...s].sort((a,b)=>(b.pts-a.pts)||(b.dif-a.dif));
    setStandings(sorted);save(KEYS.standings,sorted);setEditing(false);
  };
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TABLA DE POSICIONES</h2>
        <Btn small onClick={()=>{setForm({...empty});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:C.accent,color:C.bg}}>{["#","EQUIPO","PJ","PG","PE","PP","GF","GC","DIF","PTS",""].map(h=><th key={h} style={{padding:"10px 8px",textAlign:h==="EQUIPO"?"left":"center",fontFamily:FF,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {standings.length===0&&<tr><td colSpan={11} style={{textAlign:"center",padding:32,color:C.gray}}>No hay equipos cargados aún</td></tr>}
            {standings.map((t,i)=>(
              <tr key={i} style={{background:t.isUs?C.purple+"22":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                <td style={{textAlign:"center",padding:"10px 8px",color:C.gray,fontWeight:700}}>{i+1}</td>
                <td style={{padding:"10px 8px",color:t.isUs?C.purple:C.white,fontWeight:t.isUs?700:400}}>{t.isUs&&"🔵 "}{t.name}</td>
                {[t.pj,t.pg,t.pe,t.pp,t.gf,t.gc].map((v,j)=><td key={j} style={{textAlign:"center",padding:"10px 8px",color:"#ccc"}}>{v}</td>)}
                <td style={{textAlign:"center",padding:"10px 8px",color:t.dif>0?C.green:t.dif<0?C.red:"#ccc",fontWeight:700}}>{t.dif>0?"+":""}{t.dif}</td>
                <td style={{textAlign:"center",padding:"10px 8px",color:C.accent,fontWeight:700,fontSize:15}}>{t.pts}</td>
                <td style={{textAlign:"center"}}>
                  <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                    <button onClick={()=>{setForm({...standings[i]});setEditIdx(i);setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                    <button onClick={()=>{const s=[...standings];s.splice(i,1);setStandings(s);save(KEYS.standings,s);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing&&(
        <Modal title={editIdx!==null?"Editar equipo":"Agregar equipo"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{["pj","pg","pe","pp","gf","gc"].map(f=><Input key={f} label={f.toUpperCase()} type="number" min={0} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>)}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><input type="checkbox" id="isUs" checked={form.isUs} onChange={e=>setForm({...form,isUs:e.target.checked})}/><label htmlFor="isUs" style={{color:C.gray,fontSize:13}}>Este es Universitario LP</label></div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// SCORERS
// ═══════════════════════════════════════════════════════════════════════════════
function ScorersView({scorers,setScorers,rivals}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const [filter,setFilter]=useState("");
  const [teamFilter,setTeamFilter]=useState("");
  const teams=[...new Set(scorers.map(s=>s.team))].sort();
  const filtered=scorers.filter(s=>{
    const matchName=!filter||s.name.toLowerCase().includes(filter.toLowerCase());
    const matchTeam=!teamFilter||s.team===teamFilter;
    return matchName&&matchTeam;
  });
  const submit=()=>{
    const entry={...form,goals:+form.goals,pc:+form.pc};
    const s=editIdx!==null?scorers.map((x,i)=>i===editIdx?entry:x):[...scorers,entry];
    const sorted=[...s].sort((a,b)=>b.goals-a.goals);
    setScorers(sorted);save(KEYS.scorers,sorted);setEditing(false);
  };
  const teamOpts=[{value:"",label:"— Club —"},...rivals.map(r=>({value:r.name,label:r.name}))];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TABLA DE GOLEADORAS</h2>
        <Btn small onClick={()=>{setForm({name:"",team:"",goals:0,pc:0});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>
      </div>
      {/* Filtros */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        <div style={{position:"relative"}}>
          <input style={{...inp,paddingLeft:34}} placeholder="Buscar jugadora..." value={filter} onChange={e=>setFilter(e.target.value)}/>
          <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Icon name="eye" size={14} color={C.gray}/></div>
        </div>
        <select style={{...inp,cursor:"pointer"}} value={teamFilter} onChange={e=>setTeamFilter(e.target.value)}>
          <option value="">Todos los equipos</option>
          {teams.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:8}}>
        Mostrando {filtered.length} de {scorers.length} jugadoras · {scorers.reduce((a,s)=>a+s.goals,0)} goles totales
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:C.purple,color:C.white}}>{["#","JUGADORA","CLUB","GOLES","PC",""].map(h=><th key={h} style={{padding:"10px 8px",textAlign:["JUGADORA","CLUB"].includes(h)?"left":"center",fontFamily:FF,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={6} style={{textAlign:"center",padding:32,color:C.gray}}>Sin resultados</td></tr>}
            {filtered.map((s,i)=>{
              const realRank=scorers.findIndex(x=>x.name===s.name&&x.team===s.team);
              return(
                <tr key={i} style={{background:s.team==="U. LA PLATA"?C.accent+"11":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                  <td style={{textAlign:"center",padding:"10px 8px",fontWeight:700}}>{realRank===0?"🥇":realRank===1?"🥈":realRank===2?"🥉":<span style={{color:C.gray}}>{realRank+1}</span>}</td>
                  <td style={{padding:"10px 8px",color:s.team==="U. LA PLATA"?C.accent:C.white,fontWeight:s.team==="U. LA PLATA"?700:400}}>{s.team==="U. LA PLATA"&&"🔵 "}{s.name}</td>
                  <td style={{padding:"10px 8px",color:C.gray}}>{s.team}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.accent,fontWeight:700,fontSize:16}}>{s.goals}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.red,fontWeight:600}}>{s.pc||"—"}</td>
                  <td style={{textAlign:"center"}}>
                    <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                      <button onClick={()=>{setForm({...s});setEditIdx(scorers.findIndex(x=>x.name===s.name&&x.team===s.team));setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                      <button onClick={()=>{const s2=scorers.filter((_,j)=>j!==realRank);setScorers(s2);save(KEYS.scorers,s2);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* CULP highlight */}
      {!teamFilter&&!filter&&(
        <div style={{marginTop:14,background:C.accent+"11",border:`1px solid ${C.accent}33`,borderRadius:8,padding:12}}>
          <p style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:0.8,margin:"0 0 8px"}}>GOLEADORAS DE CULP</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {scorers.filter(s=>s.team==="U. LA PLATA").map((s,i)=>(
              <span key={i} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",fontSize:12,color:C.white}}>
                {s.name} <span style={{color:C.accent,fontWeight:700}}>{s.goals}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {editing&&(
        <Modal title={editIdx!==null?"Editar goleadora":"Agregar goleadora"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Input label="Club (escribir)" value={form.team} onChange={e=>setForm({...form,team:e.target.value})} placeholder="Ej: U. LA PLATA"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <Input label="Goles" type="number" min={0} value={form.goals} onChange={e=>setForm({...form,goals:e.target.value})}/>
            <Input label="PC" type="number" min={0} value={form.pc} onChange={e=>setForm({...form,pc:e.target.value})}/>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// FIXTURE — Sync helpers + parser + view + match editor
// ═══════════════════════════════════════════════════════════════════════════════
const US_TEAM = "U. LA PLATA";

function parseFixturePaste(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const result = [];
  let current = null;
  let lastDate = "";
  for (const line of lines) {
    const fechaMatch = line.match(/^(fecha|jornada|f\.|fecha n[º°]?)\s*[:#\-]?\s*(\d+)/i);
    if (fechaMatch) {
      current = { id: Date.now()+Math.random(), label: `Fecha ${fechaMatch[2]}`, date: lastDate, matches: [] };
      result.push(current);
      continue;
    }
    const dateOnly = line.match(/^\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?$/);
    if (dateOnly) {
      lastDate = line;
      if (current) current.date = line;
      continue;
    }
    const vsMatch = line.match(/^(.+?)\s+(?:vs\.?|–|—|-|\bv\b)\s+(.+?)$/i);
    if (vsMatch) {
      if (!current) {
        current = { id: Date.now()+Math.random(), label: `Fecha ${result.length + 1}`, date: lastDate, matches: [] };
        result.push(current);
      }
      const home = vsMatch[1].replace(/^\d+[.\)\-:\s]+/, "").trim();
      const away = vsMatch[2].trim();
      current.matches.push({
        id: Date.now()+Math.random()+current.matches.length,
        home, away,
        played: false,
        golesLocal: 0, golesVisitante: 0,
        scorers: [], cards: [],
        applied: null
      });
    }
  }
  return result;
}

function syncStandings(standings, home, away, gl, gv, sign) {
  let s = [...standings];
  const findOrCreate = name => {
    let i = s.findIndex(t => t.name === name);
    if (i < 0) { s.push({ name, pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,pts:0,dif:0,isUs:name===US_TEAM }); i = s.length-1; }
    return i;
  };
  const hi = findOrCreate(home), ai = findOrCreate(away);
  const hWon = gl > gv, aWon = gv > gl, draw = gl === gv;
  s[hi] = { ...s[hi], pj: s[hi].pj+sign, pg: s[hi].pg+(hWon?sign:0), pe: s[hi].pe+(draw?sign:0), pp: s[hi].pp+(aWon?sign:0), gf: s[hi].gf+sign*gl, gc: s[hi].gc+sign*gv };
  s[ai] = { ...s[ai], pj: s[ai].pj+sign, pg: s[ai].pg+(aWon?sign:0), pe: s[ai].pe+(draw?sign:0), pp: s[ai].pp+(hWon?sign:0), gf: s[ai].gf+sign*gv, gc: s[ai].gc+sign*gl };
  s = s.map(t => ({ ...t, pts: t.pg*3+t.pe, dif: t.gf-t.gc }));
  return s.sort((a,b) => (b.pts-a.pts) || (b.dif-a.dif) || (b.gf-a.gf));
}

function syncScorers(scorers, scList, home, away, sign) {
  let s = [...scorers];
  for (const g of scList) {
    if (!g.nombre) continue;
    const team = g.equipo === "local" ? home : away;
    let i = s.findIndex(x => x.name.toLowerCase() === g.nombre.toLowerCase() && x.team === team);
    if (i < 0) {
      if (sign < 0) continue;
      s.push({ name: g.nombre, team, goals: 0, pc: 0 });
      i = s.length-1;
    }
    s[i] = { ...s[i], goals: s[i].goals+sign, pc: s[i].pc + (g.tipo==="pc" ? sign : 0) };
    if (s[i].goals <= 0) s.splice(i, 1);
  }
  return s.sort((a,b) => b.goals - a.goals);
}

function syncCards(cards, cdList, home, away, sign) {
  let c = [...cards];
  for (const t of cdList) {
    if (!t.nombre) continue;
    const team = t.equipo === "local" ? home : away;
    let i = c.findIndex(x => x.name.toLowerCase() === t.nombre.toLowerCase() && x.team === team);
    if (i < 0) {
      if (sign < 0) continue;
      c.push({ name: t.nombre, team, verde: 0, amarilla: 0, roja: 0 });
      i = c.length-1;
    }
    c[i] = { ...c[i], [t.tipo]: (c[i][t.tipo]||0) + sign };
    if ((c[i].verde||0)<=0 && (c[i].amarilla||0)<=0 && (c[i].roja||0)<=0) c.splice(i, 1);
  }
  return c.sort((a,b) => (b.roja*3+b.amarilla*2+b.verde) - (a.roja*3+a.amarilla*2+a.verde));
}

function MatchEditor({match, onSave, onClose}) {
  const [m, setM] = useState({...match, scorers:[...(match.scorers||[])], cards:[...(match.cards||[])]});
  const upd = (k, v) => setM(prev => ({...prev, [k]: v}));
  const addScorer = () => upd("scorers", [...m.scorers, {nombre:"", equipo:"local", tipo:"gol", minuto:""}]);
  const updScorer = (i, k, v) => upd("scorers", m.scorers.map((s,j)=>j===i?{...s,[k]:v}:s));
  const rmScorer = (i) => upd("scorers", m.scorers.filter((_,j)=>j!==i));
  const addCard = () => upd("cards", [...m.cards, {nombre:"", equipo:"local", tipo:"verde", minuto:""}]);
  const updCard = (i, k, v) => upd("cards", m.cards.map((s,j)=>j===i?{...s,[k]:v}:s));
  const rmCard = (i) => upd("cards", m.cards.filter((_,j)=>j!==i));
  return (
    <Modal title={`${m.home} vs ${m.away}`} onClose={onClose} wide>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 12px",background:C.card2,borderRadius:8,border:`1px solid ${m.played?C.green+"55":C.border}`}}>
        <input type="checkbox" id="played" checked={m.played} onChange={e=>upd("played", e.target.checked)} style={{transform:"scale(1.3)",cursor:"pointer"}}/>
        <label htmlFor="played" style={{color:m.played?C.green:C.gray,fontWeight:700,fontFamily:FF,fontSize:13,letterSpacing:1,cursor:"pointer"}}>{m.played?"PARTIDO JUGADO":"MARCAR COMO JUGADO"}</label>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"end",marginBottom:18}}>
        <div>
          <p style={{margin:"0 0 4px",color:C.gray,fontSize:10,letterSpacing:0.8}}>LOCAL</p>
          <p style={{margin:0,color:C.white,fontWeight:700,fontFamily:FF,fontSize:14}}>{m.home}</p>
          <input type="number" min={0} value={m.golesLocal} onChange={e=>upd("golesLocal", +e.target.value)} disabled={!m.played} style={{...inp,fontSize:28,textAlign:"center",fontFamily:FF,marginTop:6,opacity:m.played?1:0.4}}/>
        </div>
        <span style={{color:C.gray,fontSize:18,fontFamily:FF,paddingBottom:14}}>—</span>
        <div>
          <p style={{margin:"0 0 4px",color:C.gray,fontSize:10,letterSpacing:0.8,textAlign:"right"}}>VISITANTE</p>
          <p style={{margin:0,color:C.white,fontWeight:700,fontFamily:FF,fontSize:14,textAlign:"right"}}>{m.away}</p>
          <input type="number" min={0} value={m.golesVisitante} onChange={e=>upd("golesVisitante", +e.target.value)} disabled={!m.played} style={{...inp,fontSize:28,textAlign:"center",fontFamily:FF,marginTop:6,opacity:m.played?1:0.4}}/>
        </div>
      </div>
      {m.played && (
        <>
          <SCard title="Goleadoras" color={C.accent} icon="trophy">
            {m.scorers.length===0 && <p style={{color:C.gray,fontSize:12,margin:"0 0 8px"}}>Sin goles cargados</p>}
            {m.scorers.map((g, i) => (
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 70px 28px",gap:6,marginBottom:6,alignItems:"center"}}>
                <input style={inp} placeholder="Apellido, Nombre" value={g.nombre} onChange={e=>updScorer(i,"nombre",e.target.value)}/>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={g.equipo} onChange={e=>updScorer(i,"equipo",e.target.value)}>
                  <option value="local">{m.home}</option>
                  <option value="visitante">{m.away}</option>
                </select>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={g.tipo} onChange={e=>updScorer(i,"tipo",e.target.value)}>
                  <option value="gol">Gol</option>
                  <option value="pc">PC</option>
                </select>
                <button onClick={()=>rmScorer(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
              </div>
            ))}
            <Btn small outline onClick={addScorer}><Icon name="plus" size={11}/> Agregar gol</Btn>
          </SCard>
          <SCard title="Tarjetas" color={C.gold} icon="flag">
            {m.cards.length===0 && <p style={{color:C.gray,fontSize:12,margin:"0 0 8px"}}>Sin tarjetas cargadas</p>}
            {m.cards.map((t, i) => (
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 90px 28px",gap:6,marginBottom:6,alignItems:"center"}}>
                <input style={inp} placeholder="Apellido, Nombre" value={t.nombre} onChange={e=>updCard(i,"nombre",e.target.value)}/>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={t.equipo} onChange={e=>updCard(i,"equipo",e.target.value)}>
                  <option value="local">{m.home}</option>
                  <option value="visitante">{m.away}</option>
                </select>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={t.tipo} onChange={e=>updCard(i,"tipo",e.target.value)}>
                  <option value="verde">🟢 Verde</option>
                  <option value="amarilla">🟡 Amarilla</option>
                  <option value="roja">🔴 Roja</option>
                </select>
                <button onClick={()=>rmCard(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
              </div>
            ))}
            <Btn small outline color={C.gold} onClick={addCard}><Icon name="plus" size={11}/> Agregar tarjeta</Btn>
          </SCard>
        </>
      )}
      <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:14,flexWrap:"wrap"}}>
        <Btn outline danger onClick={()=>{if(confirm("¿Eliminar este partido del fixture?")) onSave({...m, _delete:true});}}><Icon name="trash" size={13}/> Eliminar</Btn>
        <div style={{display:"flex",gap:8}}>
          <Btn outline onClick={onClose}>Cancelar</Btn>
          <Btn color={C.green} onClick={()=>onSave(m)}><Icon name="save" size={14}/> Guardar</Btn>
        </div>
      </div>
    </Modal>
  );
}

function FixtureView({fixture, setFixture, standings, setStandings, scorers, setScorers, cards, setCards, rivals, setRivals}) {
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(null);
  const [newMatch, setNewMatch] = useState({home:"",away:""});
  const [collapsed, setCollapsed] = useState({});

  const toggleCollapsed = id => setCollapsed(prev => ({...prev, [id]: !prev[id]}));

  function applyPaste() {
    const parsed = parseFixturePaste(pasteText);
    if (parsed.length === 0) {
      alert("No se detectaron partidos. Probá con un formato como:\n\nFecha 1\nU. LA PLATA vs MACABI\nPUCARA vs BANFIELD");
      return;
    }
    const merged = [...fixture, ...parsed];
    setFixture(merged); save(KEYS.fixture, merged);
    setPasteText(""); setShowPaste(false);
  }

  function addFecha() {
    const f = { id: Date.now()+Math.random(), label: `Fecha ${fixture.length + 1}`, date: "", matches: [] };
    const updated = [...fixture, f];
    setFixture(updated); save(KEYS.fixture, updated);
  }

  function removeFecha(idx) {
    if (!confirm("¿Eliminar esta fecha completa? Se revertirán los resultados ya cargados.")) return;
    const f = fixture[idx];
    let s = standings, sc = scorers, cd = cards;
    for (const m of f.matches) {
      if (m.applied) {
        s = syncStandings(s, m.home, m.away, m.applied.golesLocal, m.applied.golesVisitante, -1);
        sc = syncScorers(sc, m.applied.scorers, m.home, m.away, -1);
        cd = syncCards(cd, m.applied.cards, m.home, m.away, -1);
      }
    }
    setStandings(s); save(KEYS.standings, s);
    setScorers(sc); save(KEYS.scorers, sc);
    setCards(cd); save(KEYS.cards, cd);
    const updated = fixture.filter((_,i)=>i!==idx);
    setFixture(updated); save(KEYS.fixture, updated);
  }

  function addMatchToFecha(fechaIdx) {
    if (!newMatch.home.trim() || !newMatch.away.trim()) return;
    const updated = fixture.map((f,i) => i===fechaIdx ? {
      ...f,
      matches: [...f.matches, {
        id: Date.now()+Math.random(),
        home: newMatch.home.trim(), away: newMatch.away.trim(),
        played: false, golesLocal: 0, golesVisitante: 0,
        scorers: [], cards: [], applied: null
      }]
    } : f);
    setFixture(updated); save(KEYS.fixture, updated);
    setNewMatch({home:"",away:""}); setShowAdd(null);
  }

  function saveMatch(fechaIdx, matchIdx, updated) {
    const original = fixture[fechaIdx].matches[matchIdx];
    const wasApplied = original.applied;
    let s = standings, sc = scorers, cd = cards;

    if (updated._delete) {
      if (wasApplied) {
        s = syncStandings(s, original.home, original.away, wasApplied.golesLocal, wasApplied.golesVisitante, -1);
        sc = syncScorers(sc, wasApplied.scorers, original.home, original.away, -1);
        cd = syncCards(cd, wasApplied.cards, original.home, original.away, -1);
        setStandings(s); save(KEYS.standings, s);
        setScorers(sc); save(KEYS.scorers, sc);
        setCards(cd); save(KEYS.cards, cd);
      }
      const updatedRivals = rivals.map(r => ({...r, matches: (r.matches||[]).filter(x => x.fixtureRef !== original.id)}));
      setRivals(updatedRivals); save(KEYS.rivals, updatedRivals);
      const newFix = fixture.map((f,i) => i===fechaIdx ? {...f, matches: f.matches.filter((_,j)=>j!==matchIdx)} : f);
      setFixture(newFix); save(KEYS.fixture, newFix);
      setEditing(null);
      return;
    }

    if (wasApplied) {
      s = syncStandings(s, original.home, original.away, wasApplied.golesLocal, wasApplied.golesVisitante, -1);
      sc = syncScorers(sc, wasApplied.scorers, original.home, original.away, -1);
      cd = syncCards(cd, wasApplied.cards, original.home, original.away, -1);
    }

    let newApplied = null;
    if (updated.played) {
      s = syncStandings(s, updated.home, updated.away, +updated.golesLocal, +updated.golesVisitante, +1);
      sc = syncScorers(sc, updated.scorers, updated.home, updated.away, +1);
      cd = syncCards(cd, updated.cards, updated.home, updated.away, +1);
      newApplied = {
        golesLocal: +updated.golesLocal, golesVisitante: +updated.golesVisitante,
        scorers: updated.scorers.map(g=>({...g})),
        cards: updated.cards.map(t=>({...t}))
      };
    }

    const finalMatch = { ...updated, applied: newApplied };
    delete finalMatch._delete;

    setStandings(s); save(KEYS.standings, s);
    setScorers(sc); save(KEYS.scorers, sc);
    setCards(cd); save(KEYS.cards, cd);

    // Sincronizar historial de rivales (si home o away coincide con un rival cargado)
    let updatedRivals = rivals;
    const homeRival = rivals.find(r => r.name.toLowerCase() === updated.home.toLowerCase());
    const awayRival = rivals.find(r => r.name.toLowerCase() === updated.away.toLowerCase());

    function buildRivalMatch(isHome) {
      const rivalSide = isHome ? "local" : "visitante";
      return {
        date: fixture[fechaIdx].date || new Date().toISOString().split("T")[0],
        goalsFor: isHome ? +updated.golesVisitante : +updated.golesLocal,
        goalsAgainst: isHome ? +updated.golesLocal : +updated.golesVisitante,
        pcAgainst: updated.scorers.filter(g => g.equipo === rivalSide && g.tipo === "pc").length,
        scorers: updated.scorers.map(g => ({...g, equipo: g.equipo === rivalSide ? "visitante" : "local"})),
        cards: updated.cards.filter(t => t.equipo === rivalSide).map(t => ({...t})),
        notes: `Cargado desde Fixture · ${fixture[fechaIdx].label}`,
        fixtureRef: original.id
      };
    }

    if (updated.played) {
      if (homeRival) {
        const rm = buildRivalMatch(true);
        const filtered = (homeRival.matches||[]).filter(x => x.fixtureRef !== original.id);
        updatedRivals = updatedRivals.map(r => r.id === homeRival.id ? {...r, matches: [...filtered, rm]} : r);
      }
      if (awayRival) {
        const rm = buildRivalMatch(false);
        const filtered = (awayRival.matches||[]).filter(x => x.fixtureRef !== original.id);
        updatedRivals = updatedRivals.map(r => r.id === awayRival.id ? {...r, matches: [...filtered, rm]} : r);
      }
    } else {
      updatedRivals = updatedRivals.map(r => ({...r, matches: (r.matches||[]).filter(x => x.fixtureRef !== original.id)}));
    }

    if (updatedRivals !== rivals) {
      setRivals(updatedRivals); save(KEYS.rivals, updatedRivals);
    }

    const newFix = fixture.map((f,i) => i===fechaIdx ? {...f, matches: f.matches.map((mm,j)=>j===matchIdx?finalMatch:mm)} : f);
    setFixture(newFix); save(KEYS.fixture, newFix);
    setEditing(null);
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>FIXTURE</h2>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <Btn small color={C.purple} onClick={()=>setShowPaste(true)}><Icon name="upload" size={12}/> Pegar fixture</Btn>
          <Btn small outline onClick={addFecha}><Icon name="plus" size={12}/> Nueva fecha</Btn>
        </div>
      </div>
      {fixture.length === 0 && (
        <div style={{textAlign:"center",padding:"48px 20px",background:C.card,border:`1px dashed ${C.border}`,borderRadius:12}}>
          <Icon name="calendar" size={40} color={C.border}/>
          <p style={{color:C.gray,margin:"14px 0 4px",fontFamily:FF,letterSpacing:1}}>NO HAY FIXTURE CARGADO</p>
          <p style={{color:C.gray,fontSize:12,margin:"0 0 14px"}}>Pegá los partidos del torneo o agregá fechas manualmente</p>
          <Btn color={C.purple} onClick={()=>setShowPaste(true)}><Icon name="upload" size={14}/> Pegar fixture</Btn>
        </div>
      )}
      {fixture.map((f, fi) => {
        const total = f.matches.length;
        const played = f.matches.filter(m=>m.played).length;
        const isCollapsed = collapsed[f.id];
        return (
          <div key={f.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:12,overflow:"hidden"}}>
            <div onClick={()=>toggleCollapsed(f.id)} style={{padding:"12px 14px",background:C.card2,borderBottom:isCollapsed?"none":`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <span style={{color:C.accent,fontFamily:FF,fontWeight:700,fontSize:16,letterSpacing:1}}>{f.label.toUpperCase()}</span>
                {f.date && <span style={{color:C.gray,fontSize:11}}>{f.date}</span>}
                <Badge text={`${played}/${total}`} color={played===total&&total>0?C.green:C.accent}/>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button title="Agregar partido" onClick={e=>{e.stopPropagation(); setShowAdd(showAdd===fi?null:fi); setCollapsed(prev=>({...prev,[f.id]:false}));}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer",padding:4}}><Icon name="plus" size={14}/></button>
                <button title="Eliminar fecha" onClick={e=>{e.stopPropagation(); removeFecha(fi);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",padding:4}}><Icon name="trash" size={13}/></button>
                <span style={{color:C.gray,fontSize:11,transform:isCollapsed?"rotate(-90deg)":"none",transition:"transform 0.15s",display:"inline-block"}}><Icon name="chevron" size={14}/></span>
              </div>
            </div>
            {!isCollapsed && (
              <div style={{padding:"8px 12px"}}>
                {f.matches.length === 0 && showAdd !== fi && <p style={{color:C.gray,fontSize:12,textAlign:"center",padding:"14px 0"}}>Sin partidos en esta fecha</p>}
                {f.matches.map((m, mi) => {
                  const isUs = m.home === US_TEAM || m.away === US_TEAM;
                  const winner = m.played ? (m.golesLocal > m.golesVisitante ? "home" : m.golesLocal < m.golesVisitante ? "away" : "draw") : null;
                  return (
                    <div key={m.id} onClick={()=>setEditing({fechaIdx:fi, matchIdx:mi, match:m})} style={{background:isUs?C.accent+"11":C.card2,border:`1px solid ${isUs?C.accent+"44":C.border}`,borderRadius:8,padding:"10px 12px",marginBottom:6,cursor:"pointer"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",alignItems:"center",gap:8}}>
                        <div style={{textAlign:"right",color:winner==="home"?C.green:C.white,fontWeight:m.home===US_TEAM?700:500,fontSize:13}}>
                          {m.home===US_TEAM&&"🔵 "}{m.home}
                        </div>
                        <div style={{textAlign:"center",fontFamily:FF,fontWeight:700}}>
                          {m.played ? (
                            <span style={{color:C.white,fontSize:18}}>{m.golesLocal} <span style={{color:C.gray,fontSize:13}}>—</span> {m.golesVisitante}</span>
                          ) : (
                            <span style={{color:C.gray,fontSize:11,letterSpacing:1,padding:"3px 8px",border:`1px solid ${C.border}`,borderRadius:6}}>VS</span>
                          )}
                        </div>
                        <div style={{color:winner==="away"?C.green:C.white,fontWeight:m.away===US_TEAM?700:500,fontSize:13}}>
                          {m.away===US_TEAM&&"🔵 "}{m.away}
                        </div>
                      </div>
                      {m.played && (m.scorers.length>0 || m.cards.length>0) && (
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8,paddingTop:8,borderTop:`1px dashed ${C.border}`}}>
                          {m.scorers.map((g,i)=><Badge key={"g"+i} text={`⚽ ${g.nombre}${g.tipo==="pc"?" (PC)":""}`} color={C.accent}/>)}
                          {m.cards.map((t,i)=>{const tc=t.tipo==="verde"?C.green:t.tipo==="amarilla"?C.gold:C.red; const em=t.tipo==="verde"?"🟢":t.tipo==="amarilla"?"🟡":"🔴"; return <Badge key={"c"+i} text={`${em} ${t.nombre}`} color={tc}/>;})}
                        </div>
                      )}
                    </div>
                  );
                })}
                {showAdd === fi && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 30px 1fr 50px",gap:6,padding:"8px 0",alignItems:"center"}}>
                    <input style={inp} placeholder="Local" value={newMatch.home} onChange={e=>setNewMatch(n=>({...n,home:e.target.value}))}/>
                    <span style={{color:C.gray,textAlign:"center",fontSize:11}}>vs</span>
                    <input style={inp} placeholder="Visitante" value={newMatch.away} onChange={e=>setNewMatch(n=>({...n,away:e.target.value}))}/>
                    <Btn small onClick={()=>addMatchToFecha(fi)}><Icon name="check" size={11}/></Btn>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {showPaste && (
        <Modal title="Pegar fixture" onClose={()=>setShowPaste(false)} wide>
          <p style={{color:C.gray,fontSize:12,margin:"0 0 10px"}}>
            Pegá la lista de partidos. Reconoce <span style={{color:C.accent}}>"Fecha 1"</span> o <span style={{color:C.accent}}>"Jornada 3"</span> como encabezados, y partidos con <span style={{color:C.accent}}>"Equipo A vs Equipo B"</span>.
          </p>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:10,marginBottom:10,fontSize:11,color:C.gray,fontFamily:"monospace",whiteSpace:"pre-line"}}>
{`Fecha 1
U. LA PLATA vs MACABI
PUCARA vs BANFIELD
C.A.S.I. vs LANUS

Fecha 2
MACABI vs PUCARA
...`}
          </div>
          <textarea style={{...inp,minHeight:200,fontFamily:"monospace",fontSize:12}} value={pasteText} onChange={e=>setPasteText(e.target.value)} placeholder="Pegá acá el fixture..."/>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:10}}>
            <Btn outline onClick={()=>setShowPaste(false)}>Cancelar</Btn>
            <Btn color={C.purple} onClick={applyPaste}><Icon name="check" size={14}/> Importar</Btn>
          </div>
        </Modal>
      )}
      {editing && <MatchEditor match={editing.match} onSave={(m)=>saveMatch(editing.fechaIdx, editing.matchIdx, m)} onClose={()=>setEditing(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARDS VIEW
// ═══════════════════════════════════════════════════════════════════════════════
function CardsView({cards, setCards}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const [filter,setFilter]=useState("");
  const [teamFilter,setTeamFilter]=useState("");
  const [typeFilter,setTypeFilter]=useState("");
  const teams=[...new Set(cards.map(c=>c.team))].sort();
  const filtered=cards.filter(c=>{
    const matchName=!filter||c.name.toLowerCase().includes(filter.toLowerCase());
    const matchTeam=!teamFilter||c.team===teamFilter;
    const matchType=!typeFilter||(c[typeFilter]||0)>0;
    return matchName&&matchTeam&&matchType;
  });
  const submit=()=>{
    const entry={...form,verde:+form.verde,amarilla:+form.amarilla,roja:+form.roja};
    const c=editIdx!==null?cards.map((x,i)=>i===editIdx?entry:x):[...cards,entry];
    const sorted=[...c].sort((a,b)=>(b.roja*3+b.amarilla*2+b.verde)-(a.roja*3+a.amarilla*2+a.verde));
    setCards(sorted);save(KEYS.cards,sorted);setEditing(false);
  };
  const totalsByTeam = teams.map(team => {
    const list = cards.filter(c => c.team === team);
    return {
      team,
      verde: list.reduce((a,c)=>a+(c.verde||0),0),
      amarilla: list.reduce((a,c)=>a+(c.amarilla||0),0),
      roja: list.reduce((a,c)=>a+(c.roja||0),0)
    };
  }).sort((a,b)=>(b.roja*3+b.amarilla*2+b.verde)-(a.roja*3+a.amarilla*2+a.verde));
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TARJETAS</h2>
        <Btn small onClick={()=>{setForm({name:"",team:"",verde:0,amarilla:0,roja:0});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 110px",gap:8,marginBottom:14}}>
        <input style={inp} placeholder="Buscar jugadora..." value={filter} onChange={e=>setFilter(e.target.value)}/>
        <select style={{...inp,cursor:"pointer"}} value={teamFilter} onChange={e=>setTeamFilter(e.target.value)}>
          <option value="">Todos los equipos</option>
          {teams.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
        <select style={{...inp,cursor:"pointer"}} value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
          <option value="">Todas</option>
          <option value="verde">🟢 Verde</option>
          <option value="amarilla">🟡 Amarilla</option>
          <option value="roja">🔴 Roja</option>
        </select>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:10}}>
        {cards.length} jugadoras · 🟢 {cards.reduce((a,c)=>a+(c.verde||0),0)} · 🟡 {cards.reduce((a,c)=>a+(c.amarilla||0),0)} · 🔴 {cards.reduce((a,c)=>a+(c.roja||0),0)}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:C.gold,color:C.bg}}>{["#","JUGADORA","CLUB","🟢","🟡","🔴",""].map(h=><th key={h} style={{padding:"10px 8px",textAlign:["JUGADORA","CLUB"].includes(h)?"left":"center",fontFamily:FF,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={7} style={{textAlign:"center",padding:32,color:C.gray}}>Sin tarjetas registradas</td></tr>}
            {filtered.map((c,i)=>{
              const realRank=cards.findIndex(x=>x.name===c.name&&x.team===c.team);
              return(
                <tr key={i} style={{background:c.team===US_TEAM?C.accent+"11":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.gray,fontWeight:700}}>{realRank+1}</td>
                  <td style={{padding:"10px 8px",color:c.team===US_TEAM?C.accent:C.white,fontWeight:c.team===US_TEAM?700:400}}>{c.team===US_TEAM&&"🔵 "}{c.name}</td>
                  <td style={{padding:"10px 8px",color:C.gray}}>{c.team}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.green,fontWeight:700}}>{c.verde||"—"}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.gold,fontWeight:700}}>{c.amarilla||"—"}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.red,fontWeight:700}}>{c.roja||"—"}</td>
                  <td style={{textAlign:"center"}}>
                    <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                      <button onClick={()=>{setForm({...c});setEditIdx(realRank);setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                      <button onClick={()=>{const c2=cards.filter((_,j)=>j!==realRank);setCards(c2);save(KEYS.cards,c2);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalsByTeam.length>0 && (
        <div style={{marginTop:18}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>POR EQUIPO</p>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            {totalsByTeam.map((t,i)=>(
              <div key={t.team} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:i<totalsByTeam.length-1?`1px solid ${C.border}`:"none",background:t.team===US_TEAM?C.accent+"11":"transparent"}}>
                <span style={{flex:1,color:t.team===US_TEAM?C.accent:C.white,fontWeight:t.team===US_TEAM?700:500}}>{t.team===US_TEAM&&"🔵 "}{t.team}</span>
                <span style={{color:C.green,fontWeight:700,minWidth:36,textAlign:"right"}}>🟢 {t.verde}</span>
                <span style={{color:C.gold,fontWeight:700,minWidth:36,textAlign:"right"}}>🟡 {t.amarilla}</span>
                <span style={{color:C.red,fontWeight:700,minWidth:36,textAlign:"right"}}>🔴 {t.roja}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {editing&&(
        <Modal title={editIdx!==null?"Editar tarjetas":"Agregar tarjetas"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Input label="Club" value={form.team} onChange={e=>setForm({...form,team:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <Input label="🟢 Verdes" type="number" min={0} value={form.verde} onChange={e=>setForm({...form,verde:e.target.value})}/>
            <Input label="🟡 Amarillas" type="number" min={0} value={form.amarilla} onChange={e=>setForm({...form,amarilla:e.target.value})}/>
            <Input label="🔴 Rojas" type="number" min={0} value={form.roja} onChange={e=>setForm({...form,roja:e.target.value})}/>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RIVAL FORM
// ═══════════════════════════════════════════════════════════════════════════════
function RivalForm({rival,onSave,onCancel,onUpdateScorers}) {
  const emptyA={city:"",colors:"",coach:"",assistant:"",physio:"",goalkeeperCoach:"",goalkeeper:"",captain:"",keyPlayers:"",injuries:"",formation:"",offensiveStructure:"",attackDisposition:"",attackNotes:"",exitType:"",exitKeyPlayer:"",exitSide:"",pressureApplied:"",arrivalZones:"",shooters:"",goalPlays:"",goalsLastMatch:"",pcOffVariants:"",pcOffExecutor:"",pcOffShooter:"",pcOffSecond:"",pressType:"",pressZone:"",pressIntensity:"",pressTriggers:"",blockType:"",defensiveLine:"",zoneStructure:"",vulnerableIn:"",marksSystem:"",whoMarksUs:"",dangerZones:"",transition:"",pcDefSystem:"",pcDefExit:"",pcDefRunner:"",pcDefGK:"",strengths:"",weaknesses:"",planBall:"",planNoBall:"",planPCOff:"",planPCDef:""};
  const [name,setName]=useState(rival?.name||"");
  const [date,setDate]=useState(rival?.date||"");
  const [round,setRound]=useState(rival?.round||"");
  const [tab,setTab]=useState("perfil");
  const [analysis,setAnalysis]=useState(rival?{...emptyA,...rival.analysis}:emptyA);
  const [matches,setMatches]=useState(rival?.matches||[]);
  const [showScan,setShowScan]=useState(false);
  const [toast,setToast]=useState(null);
  const [newMatch,setNewMatch]=useState({date:"",goalsFor:0,goalsAgainst:0,pcFor:0,pcAgainst:0,notes:""});
  const [showManual,setShowManual]=useState(false);
  const upd=k=>e=>setAnalysis(a=>({...a,[k]:e.target.value}));
  function applyPlanilla(data) {
    const culpIsLocal=data.equipoLocal?.toLowerCase().includes("univer")||data.equipoLocal?.toLowerCase().includes("culp");
    const gf=culpIsLocal?data.golesLocal:data.golesVisitante;
    const gc=culpIsLocal?data.golesVisitante:data.golesLocal;
    const match={date:data.fecha||new Date().toISOString().split("T")[0],goalsFor:gf??0,goalsAgainst:gc??0,pcFor:culpIsLocal?data.cornersLocal:data.cornersVisitante,pcAgainst:culpIsLocal?data.cornersVisitante:data.cornersLocal,scorers:data.goleadoras||[],cards:data.tarjetas||[],jugadoras:culpIsLocal?data.jugadorasVisitante:data.jugadorasLocal,notes:data.notas||""};
    setMatches(ms=>[...ms,match]);
    if(!name) setName(culpIsLocal?(data.equipoVisitante||""):(data.equipoLocal||""));
    const rivalScorers=(data.goleadoras||[]).filter(g=>g.equipo===(culpIsLocal?"visitante":"local")).map(g=>g.nombre).filter(Boolean);
    if(rivalScorers.length>0) setAnalysis(a=>({...a,shooters:[...new Set([...(a.shooters?a.shooters.split(", "):[]),...rivalScorers])].join(", ")}));
    if(onUpdateScorers) onUpdateScorers((data.goleadoras||[]).filter(g=>g.equipo===(culpIsLocal?"visitante":"local")),culpIsLocal?data.equipoVisitante:data.equipoLocal);
    setToast(`✅ Partido cargado: CULP ${gf??0}—${gc??0} · ${data.goleadoras?.length||0} goles · ${data.tarjetas?.length||0} tarjetas`);
    setTimeout(()=>setToast(null),5000);
  }
  const tabs=[{id:"perfil",label:"Perfil",icon:"shield"},{id:"conpelota",label:"Con pelota",icon:"target"},{id:"sinpelota",label:"Sin pelota",icon:"flag"},{id:"corners",label:"Corners",icon:"corner"},{id:"partidos",label:`Partidos (${matches.length})`,icon:"chart"},{id:"conclusion",label:"Conclusión",icon:"star"}];
  const tabBtn=id=>({padding:"7px 11px",border:"none",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:FF,letterSpacing:0.5,background:tab===id?C.accent:"transparent",color:tab===id?C.bg:C.gray,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"});
  return(
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="back" size={20}/></button>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:20,letterSpacing:1,flex:1,minWidth:0}}>{rival?`EDITAR: ${rival.name.toUpperCase()}`:"NUEVO ANÁLISIS"}</h2>
        <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={13}/> Importar planilla</Btn>
      </div>
      {toast&&<div style={{background:C.green+"18",border:`1px solid ${C.green}44`,borderRadius:8,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}><Icon name="check" size={14} color={C.green}/><span style={{color:C.green,fontSize:13}}>{toast}</span></div>}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8,marginBottom:14}}>
        <Input label="Nombre del rival" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej: San Fernando"/>
        <Input label="Próximo partido" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        <Input label="Ronda" value={round} onChange={e=>setRound(e.target.value)} placeholder="Ej: Fecha 5"/>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:14,background:C.card,padding:6,borderRadius:10,overflowX:"auto"}}>
        {tabs.map(t=><button key={t.id} style={tabBtn(t.id)} onClick={()=>setTab(t.id)}><Icon name={t.icon} size={12}/>{t.label}</button>)}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
        {tab==="perfil"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>DATOS DEL CLUB</p>
              <Input label="Ciudad" value={analysis.city} onChange={upd("city")}/>
              <Input label="Colores" value={analysis.colors} onChange={upd("colors")}/>
              <Input label="DT Principal" value={analysis.coach} onChange={upd("coach")}/>
              <Input label="Asistente" value={analysis.assistant} onChange={upd("assistant")}/>
              <Input label="Prep. Física" value={analysis.physio} onChange={upd("physio")}/>
            </div>
            <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PLANTEL</p>
              <Input label="Arquera titular" value={analysis.goalkeeper} onChange={upd("goalkeeper")}/>
              <Input label="Capitana" value={analysis.captain} onChange={upd("captain")}/>
              <Textarea label="Jugadoras clave" value={analysis.keyPlayers} onChange={upd("keyPlayers")}/>
              <Input label="Bajas / Lesionadas" value={analysis.injuries} onChange={upd("injuries")}/>
            </div>
          </div>
        )}
        {tab==="conpelota"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>SISTEMA / FORMACIÓN</p>
                <Input label="Formación base" value={analysis.formation} onChange={upd("formation")} placeholder="Ej: 4-3-3"/>
                <Input label="Estructura ofensiva" value={analysis.offensiveStructure} onChange={upd("offensiveStructure")}/>
                <Textarea label="Notas generales" value={analysis.attackNotes} onChange={upd("attackNotes")}/>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
                <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>SALIDA DESDE EL FONDO</p>
                <Input label="Tipo de salida" value={analysis.exitType} onChange={upd("exitType")}/>
                <Input label="Jugadora clave" value={analysis.exitKeyPlayer} onChange={upd("exitKeyPlayer")}/>
                <Select label="Lado predominante" value={analysis.exitSide} onChange={upd("exitSide")} options={["","Derecho","Izquierdo","Central","Variable"]}/>
                <Input label="Presión aplicada" value={analysis.pressureApplied} onChange={upd("pressureApplied")}/>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>LLEGADAS Y REMATES</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div><Input label="Zonas de llegada" value={analysis.arrivalZones} onChange={upd("arrivalZones")}/><Input label="Rematadoras" value={analysis.shooters} onChange={upd("shooters")}/></div>
                <div><Textarea label="Jugadas de gol frecuentes" value={analysis.goalPlays} onChange={upd("goalPlays")}/><Input label="Goles último partido" type="number" value={analysis.goalsLastMatch} onChange={upd("goalsLastMatch")}/></div>
              </div>
            </div>
          </div>
        )}
        {tab==="sinpelota"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PRESSING</p>
                <Input label="Tipo de presión" value={analysis.pressType} onChange={upd("pressType")}/>
                <Select label="Intensidad" value={analysis.pressIntensity} onChange={upd("pressIntensity")} options={["","Alta","Media","Baja","Variable"]}/>
                <Input label="Zona de inicio" value={analysis.pressZone} onChange={upd("pressZone")}/>
                <Input label="Triggers" value={analysis.pressTriggers} onChange={upd("pressTriggers")}/>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
                <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>BLOQUE DEFENSIVO</p>
                <Select label="Tipo de bloque" value={analysis.blockType} onChange={upd("blockType")} options={["","Bloque alto","Bloque medio","Bloque bajo"]}/>
                <Input label="Línea defensiva" value={analysis.defensiveLine} onChange={upd("defensiveLine")}/>
                <Input label="Vulnerable en" value={analysis.vulnerableIn} onChange={upd("vulnerableIn")}/>
                <Select label="Sistema de marcas" value={analysis.marksSystem} onChange={upd("marksSystem")} options={["","Individual","Zonal","Mixto"]}/>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>MARCAS Y TRANSICIONES</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div><Input label="Quién nos marca" value={analysis.whoMarksUs} onChange={upd("whoMarksUs")}/><Input label="Zonas de peligro" value={analysis.dangerZones} onChange={upd("dangerZones")}/></div>
                <div><Textarea label="Transición def→ataque" value={analysis.transition} onChange={upd("transition")}/></div>
              </div>
            </div>
          </div>
        )}
        {tab==="corners"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PC OFENSIVOS (RIVAL)</p>
              <Textarea label="Variantes de PC" value={analysis.pcOffVariants} onChange={upd("pcOffVariants")}/>
              <Input label="Ejecutora" value={analysis.pcOffExecutor} onChange={upd("pcOffExecutor")}/>
              <Input label="Rematadora" value={analysis.pcOffShooter} onChange={upd("pcOffShooter")}/>
              <Input label="Jugadora 2do palo" value={analysis.pcOffSecond} onChange={upd("pcOffSecond")}/>
            </div>
            <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>NUESTRA DEFENSA DE PC</p>
              <Input label="Formación defensiva" value={analysis.pcDefSystem} onChange={upd("pcDefSystem")}/>
              <Input label="Primera salida" value={analysis.pcDefExit} onChange={upd("pcDefExit")}/>
              <Input label="Runner principal" value={analysis.pcDefRunner} onChange={upd("pcDefRunner")}/>
              <Input label="Posición arquera" value={analysis.pcDefGK} onChange={upd("pcDefGK")}/>
            </div>
          </div>
        )}
        {tab==="partidos"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <p style={{color:C.gray,fontSize:12,margin:0}}>Historial contra este rival</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={12}/> Importar PDF/Foto</Btn>
                <Btn small outline onClick={()=>setShowManual(true)}><Icon name="plus" size={12}/> Manual</Btn>
              </div>
            </div>
            {matches.length===0&&!showManual&&(
              <div style={{textAlign:"center",padding:"32px 20px"}}>
                <Icon name="image" size={36} color={C.border}/>
                <p style={{color:C.gray,margin:"12px 0 16px"}}>No hay partidos registrados</p>
                <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={12}/> Importar planilla</Btn>
              </div>
            )}
            {matches.map((m,i)=>{
              const gf=+m.goalsFor,gc=+m.goalsAgainst;
              const res=gf>gc?"W":gf===gc?"E":"L";const rc=res==="W"?C.green:res==="E"?C.gold:C.red;
              return(
                <div key={i} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:14,marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                        <Badge text={res==="W"?"GANADO":res==="E"?"EMPATE":"PERDIDO"} color={rc}/>
                        <span style={{color:C.gray,fontSize:12}}>{m.date}</span>
                        {m.pcAgainst>0&&<span style={{color:C.gray,fontSize:11}}>PC rival: {m.pcAgainst}</span>}
                      </div>
                      <span style={{color:C.white,fontSize:16,fontWeight:700,fontFamily:FF}}>CULP {gf} — {gc} {name}</span>
                      {m.scorers?.filter(g=>g.equipo==="visitante").length>0&&(
                        <div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:4}}>
                          {m.scorers.filter(g=>g.equipo==="visitante").map((g,j)=><Badge key={j} text={`⚽ ${g.nombre}${g.minuto?` ${g.minuto}'`:""}${g.tipo==="pc"?" (PC)":""}`} color={C.red}/>)}
                        </div>
                      )}
                      {m.cards?.length>0&&(
                        <div style={{marginTop:4,display:"flex",flexWrap:"wrap",gap:4}}>
                          {m.cards.map((t,j)=>{const tc=t.tipo==="verde"?C.green:t.tipo==="amarilla"?C.gold:C.red;return<Badge key={j} text={`${t.tipo==="verde"?"🟢":t.tipo==="amarilla"?"🟡":"🔴"} ${t.nombre}`} color={tc}/>;})}
                        </div>
                      )}
                      {m.notes&&<p style={{color:C.gray,fontSize:12,margin:"6px 0 0"}}>{m.notes}</p>}
                    </div>
                    <button onClick={()=>setMatches(ms=>ms.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
                  </div>
                </div>
              );
            })}
            {showManual&&(
              <div style={{background:C.card2,border:`1px solid ${C.accent}44`,borderRadius:10,padding:16,marginTop:8}}>
                <p style={{color:C.accent,fontSize:11,margin:"0 0 12px",fontWeight:700,letterSpacing:0.8}}>PARTIDO MANUAL</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
                  <Input label="Fecha" type="date" value={newMatch.date} onChange={e=>setNewMatch(m=>({...m,date:e.target.value}))}/>
                  <Input label="Goles CULP" type="number" min={0} value={newMatch.goalsFor} onChange={e=>setNewMatch(m=>({...m,goalsFor:e.target.value}))}/>
                  <Input label={`Goles ${name||"rival"}`} type="number" min={0} value={newMatch.goalsAgainst} onChange={e=>setNewMatch(m=>({...m,goalsAgainst:e.target.value}))}/>
                  <Input label="PC rival" type="number" min={0} value={newMatch.pcAgainst} onChange={e=>setNewMatch(m=>({...m,pcAgainst:e.target.value}))}/>
                </div>
                <Textarea label="Notas" value={newMatch.notes} onChange={e=>setNewMatch(m=>({...m,notes:e.target.value}))}/>
                <div style={{display:"flex",gap:8}}>
                  <Btn small onClick={()=>{setMatches(ms=>[...ms,{...newMatch,goalsFor:+newMatch.goalsFor,goalsAgainst:+newMatch.goalsAgainst,pcAgainst:+newMatch.pcAgainst,scorers:[],cards:[]}]);setNewMatch({date:"",goalsFor:0,goalsAgainst:0,pcFor:0,pcAgainst:0,notes:""});setShowManual(false);}}><Icon name="check" size={12}/> Guardar</Btn>
                  <Btn small outline onClick={()=>setShowManual(false)}>Cancelar</Btn>
                </div>
              </div>
            )}
            {matches.length>0&&(
              <div style={{marginTop:16,background:C.card2,borderRadius:8,padding:14,display:"flex",flexWrap:"wrap",gap:16}}>
                {[{l:"PJ",v:matches.length,c:C.accent},{l:"G",v:matches.filter(m=>+m.goalsFor>+m.goalsAgainst).length,c:C.green},{l:"E",v:matches.filter(m=>+m.goalsFor===+m.goalsAgainst).length,c:C.gold},{l:"P",v:matches.filter(m=>+m.goalsFor<+m.goalsAgainst).length,c:C.red},{l:"GF",v:matches.reduce((a,m)=>a+(+m.goalsFor),0),c:C.green},{l:"GC",v:matches.reduce((a,m)=>a+(+m.goalsAgainst),0),c:C.red},{l:"PC rival",v:matches.reduce((a,m)=>a+(+m.pcAgainst||0),0),c:C.red}].map(s=>(
                  <div key={s.l} style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:FF,lineHeight:1}}>{s.v}</div><div style={{fontSize:10,color:C.gray,letterSpacing:0.5}}>{s.l}</div></div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab==="conclusion"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Textarea label="💪 Fortalezas del rival" value={analysis.strengths} onChange={upd("strengths")}/>
              <Textarea label="⚠️ Para explotar" value={analysis.weaknesses} onChange={upd("weaknesses")}/>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PLAN DE PARTIDO</p>
              <Textarea label="Con pelota" value={analysis.planBall} onChange={upd("planBall")}/>
              <Textarea label="Sin pelota" value={analysis.planNoBall} onChange={upd("planNoBall")}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Textarea label="PC ofensivos" value={analysis.planPCOff} onChange={upd("planPCOff")}/>
                <Textarea label="PC defensivos" value={analysis.planPCDef} onChange={upd("planPCDef")}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:14}}>
        <Btn outline onClick={onCancel}>Cancelar</Btn>
        <Btn color={C.green} onClick={()=>onSave({id:rival?.id||Date.now(),name,date,round,analysis,matches,updatedAt:new Date().toISOString()})}>
          <Icon name="save" size={14}/> Guardar análisis
        </Btn>
      </div>
      {showScan&&<PlanillaScanner rivalName={name} onApply={applyPlanilla} onClose={()=>setShowScan(false)}/>}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// RIVAL DETAIL
// ═══════════════════════════════════════════════════════════════════════════════
function RivalDetail({rival,onEdit,onBack}) {
  const a=rival.analysis||{};
  const Row=({l,v})=>v?<div style={{display:"flex",gap:8,marginBottom:5}}><span style={{color:C.gray,fontSize:12,minWidth:120}}>{l}:</span><span style={{color:C.white,fontSize:12}}>{v}</span></div>:null;
  const wins=rival.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0;
  const draws=rival.matches?.filter(m=>+m.goalsFor===+m.goalsAgainst).length||0;
  const losses=rival.matches?.filter(m=>+m.goalsFor<+m.goalsAgainst).length||0;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="back" size={20}/></button>
          <div><h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>{rival.name.toUpperCase()}</h2><span style={{color:C.gray,fontSize:12}}>{rival.date}{rival.round?` · ${rival.round}`:""}</span></div>
        </div>
        <Btn small onClick={onEdit}><Icon name="edit" size={13}/> Editar</Btn>
      </div>
      {rival.matches?.length>0&&(
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[{l:"Partidos",v:rival.matches.length,c:C.accent},{l:"Ganados",v:wins,c:C.green},{l:"Empatados",v:draws,c:C.gold},{l:"Perdidos",v:losses,c:C.red}].map(s=>(
            <div key={s.l} style={{flex:1,background:C.card,border:`1px solid ${s.c}33`,borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:s.c,fontFamily:FF}}>{s.v}</div>
              <div style={{fontSize:10,color:C.gray}}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <SCard title="Perfil" icon="shield" color={C.accent}><Row l="Ciudad" v={a.city}/><Row l="Colores" v={a.colors}/><Row l="DT" v={a.coach}/><Row l="Capitana" v={a.captain}/><Row l="Arquera" v={a.goalkeeper}/><Row l="Jugadoras clave" v={a.keyPlayers}/></SCard>
        <SCard title="Con pelota" icon="target" color={C.accent}><Row l="Formación" v={a.formation}/><Row l="Salida" v={a.exitType}/><Row l="Lado" v={a.exitSide}/><Row l="Rematadoras" v={a.shooters}/></SCard>
        <SCard title="Sin pelota" icon="flag" color={C.red}><Row l="Presión" v={a.pressType}/><Row l="Intensidad" v={a.pressIntensity}/><Row l="Bloque" v={a.blockType}/><Row l="Marcas" v={a.marksSystem}/></SCard>
        <SCard title="Corners PC" icon="corner" color={C.purple}><Row l="Variantes" v={a.pcOffVariants}/><Row l="Ejecutora" v={a.pcOffExecutor}/><Row l="Rematadora" v={a.pcOffShooter}/></SCard>
      </div>
      {(a.strengths||a.weaknesses)&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {a.strengths&&<SCard title="💪 Fortalezas" color={C.red}><p style={{color:"#ccc",fontSize:13,margin:0}}>{a.strengths}</p></SCard>}
          {a.weaknesses&&<SCard title="⚠️ Para explotar" color={C.green}><p style={{color:"#ccc",fontSize:13,margin:0}}>{a.weaknesses}</p></SCard>}
        </div>
      )}
      {rival.matches?.length>0&&(
        <SCard title="Últimos partidos" icon="chart" color={C.accent}>
          {[...rival.matches].reverse().slice(0,5).map((m,i)=>{
            const gf=+m.goalsFor,gc=+m.goalsAgainst;const res=gf>gc?"W":gf===gc?"E":"L";const rc=res==="W"?C.green:res==="E"?C.gold:C.red;
            return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<4?`1px solid ${C.border}`:"none",flexWrap:"wrap"}}>
              <Badge text={res} color={rc}/><span style={{color:C.white,fontWeight:700}}>CULP {gf} — {gc} {rival.name}</span>
              {m.scorers?.filter(g=>g.equipo==="visitante").map((g,j)=><Badge key={j} text={`⚽ ${g.nombre}`} color={C.red}/>)}
              <span style={{color:C.gray,fontSize:12,marginLeft:"auto"}}>{m.date}</span>
            </div>);
          })}
        </SCard>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// RIVALS LIST
// ═══════════════════════════════════════════════════════════════════════════════
function RivalsView({rivals,onNew,onView,onEdit,onDelete}) {
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>ANÁLISIS DE RIVALES</h2>
        <Btn onClick={onNew}><Icon name="plus" size={14}/> Nuevo análisis</Btn>
      </div>
      {rivals.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}><Icon name="shield" size={48} color={C.border}/><p style={{color:C.gray,margin:"12px 0 20px"}}>No hay análisis cargados aún</p><Btn onClick={onNew}><Icon name="plus" size={14}/> Crear primer análisis</Btn></div>}
      <div style={{display:"grid",gap:10}}>
        {rivals.map(r=>{
          const wins=r.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0;
          const losses=r.matches?.filter(m=>+m.goalsFor<+m.goalsAgainst).length||0;
          const total=r.matches?.length||0;
          return(
            <div key={r.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <h3 style={{margin:0,color:C.white,fontFamily:FF,fontSize:17}}>{r.name}</h3>
                  {r.analysis?.formation&&<Badge text={r.analysis.formation} color={C.accent}/>}
                </div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  {r.date&&<span style={{color:C.gray,fontSize:12}}>📅 {r.date}</span>}
                  {r.round&&<span style={{color:C.gray,fontSize:12}}>{r.round}</span>}
                  {total>0&&<span style={{color:C.gray,fontSize:12}}>{total} partidos · <span style={{color:C.green}}>{wins}G</span> · <span style={{color:C.red}}>{losses}P</span></span>}
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <Btn small outline onClick={()=>onView(r)}><Icon name="eye" size={12}/></Btn>
                <Btn small outline onClick={()=>onEdit(r)}><Icon name="edit" size={12}/></Btn>
                <button onClick={()=>onDelete(r.id)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",padding:6}}><Icon name="trash" size={14}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function Dashboard({rivals,standings,scorers,setView}) {
  const totalWins=rivals.reduce((a,r)=>a+(r.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0),0);
  const usPos=standings.findIndex(t=>t.isUs);
  const culpScorers=scorers.filter(s=>s.team==="U. LA PLATA");
  const stats=[{l:"Rivales analizados",v:rivals.length,c:C.accent,icon:"shield"},{l:"Partidos registrados",v:rivals.reduce((a,r)=>a+(r.matches?.length||0),0),c:C.purple,icon:"chart"},{l:"Victorias",v:totalWins,c:C.green,icon:"trophy"},{l:"Posición actual",v:usPos>=0?`#${usPos+1}`:"—",c:C.gold,icon:"star"}];
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{width:40,height:40,background:C.accent+"22",border:`2px solid ${C.accent}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏑</div>
        <div><h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>CULP HOCKEY</h2><p style={{margin:0,color:C.gray,fontSize:10,letterSpacing:0.5}}>PRIMERA DAMAS · ANÁLISIS DE RIVALES</p></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:C.card,border:`1px solid ${s.c}22`,borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:26,fontWeight:700,color:s.c,fontFamily:FF,lineHeight:1}}>{s.v}</div><div style={{fontSize:10,color:C.gray,marginTop:3,letterSpacing:0.5}}>{s.l.toUpperCase()}</div></div>
            <Icon name={s.icon} size={20} color={s.c+"55"}/>
          </div>
        ))}
      </div>
      {/* CTA importar */}
      <div style={{background:`linear-gradient(135deg,${C.purple}33,${C.accent}22)`,border:`1px solid ${C.accent}33`,borderRadius:12,padding:16,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div><p style={{margin:0,color:C.white,fontWeight:700,fontSize:13,fontFamily:FF,letterSpacing:0.5}}>📄 ¿TENÉS UNA PLANILLA NUEVA?</p><p style={{margin:"4px 0 0",color:C.gray,fontSize:12}}>Subí el PDF oficial o una foto y Claude carga todos los datos</p></div>
        <Btn small color={C.purple} onClick={()=>setView("rivals")}>Ir a rivales</Btn>
      </div>
      {/* Goleadoras CULP */}
      {culpScorers.length>0&&(
        <div style={{marginBottom:16}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>GOLEADORAS DE CULP — TORNEO</p>
          <div style={{background:C.card,border:`1px solid ${C.accent}22`,borderRadius:10,overflow:"hidden"}}>
            {culpScorers.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:i<culpScorers.length-1?`1px solid ${C.border}`:"none"}}>
                <span style={{color:i===0?"#FFD700":C.gray,fontWeight:700,minWidth:18,textAlign:"center",fontSize:12}}>{i===0?"🥇":i+1}</span>
                <span style={{flex:1,color:C.accent,fontSize:13}}>{s.name}</span>
                <span style={{color:C.accent,fontWeight:700,fontFamily:FF,fontSize:15}}>{s.goals}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {rivals.length>0&&<div style={{marginBottom:16}}>
        <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>ÚLTIMOS ANÁLISIS</p>
        {[...rivals].slice(-3).reverse().map(r=>(
          <div key={r.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:C.white,fontWeight:600}}>{r.name}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {r.date&&<span style={{color:C.gray,fontSize:12}}>{r.date}</span>}
              {r.matches?.length>0&&<Badge text={`${r.matches.length} partidos`} color={C.accent}/>}
            </div>
          </div>
        ))}
      </div>}
      {standings.length>0&&<div>
        <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>TOP 5 TABLA</p>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
          {standings.slice(0,5).map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:i<4?`1px solid ${C.border}`:"none",background:t.isUs?C.purple+"11":"transparent"}}>
              <span style={{color:C.gray,fontWeight:700,minWidth:18,textAlign:"center",fontSize:13}}>{i+1}</span>
              <span style={{flex:1,color:t.isUs?C.purple:C.white,fontWeight:t.isUs?700:400}}>{t.isUs&&"🔵 "}{t.name}</span>
              <span style={{color:C.accent,fontWeight:700,fontFamily:FF,fontSize:15}}>{t.pts} pts</span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [rivals,setRivals]=useState([]);
  const [standings,setStandings]=useState([]);
  const [scorers,setScorers]=useState([]);
  const [fixture,setFixture]=useState([]);
  const [cards,setCards]=useState([]);
  const [loaded,setLoaded]=useState(false);
  const [view,setView]=useState("home");
  const [subview,setSubview]=useState(null);
  const [selected,setSelected]=useState(null);
  useEffect(()=>{
    Promise.all([load(KEYS.rivals),load(KEYS.standings),load(KEYS.scorers),load(KEYS.seeded),load(KEYS.fixture),load(KEYS.cards)]).then(async([r,s,sc,seeded,fx,cd])=>{
      if(r) setRivals(r);
      if(s) setStandings(s);
      if(fx) setFixture(fx);
      if(cd) setCards(cd);
      // Si no hay goleadoras guardadas O nunca se sembró, cargar datos iniciales
      if(!seeded || !sc || sc.length===0) {
        setScorers(INITIAL_SCORERS);
        await save(KEYS.scorers, INITIAL_SCORERS);
        await save(KEYS.seeded, true);
      } else {
        setScorers(sc);
      }
      setLoaded(true);
    });
  },[]);
  function saveRival(r){
    const updated=rivals.find(x=>x.id===r.id)?rivals.map(x=>x.id===r.id?r:x):[...rivals,r];
    setRivals(updated);save(KEYS.rivals,updated);setSubview(null);setSelected(null);
  }
  function deleteRival(id){
    if(!confirm("¿Eliminar este análisis?"))return;
    const updated=rivals.filter(r=>r.id!==id);setRivals(updated);save(KEYS.rivals,updated);
  }
  function updateScorersFromPlanilla(goleadoras,rivalTeam){
    setScorers(prev=>{
      const updated=[...prev];
      goleadoras.forEach(g=>{
        if(!g.nombre)return;
        const idx=updated.findIndex(s=>s.name.toLowerCase()===g.nombre.toLowerCase());
        if(idx>=0){updated[idx]={...updated[idx],goals:updated[idx].goals+1,pc:updated[idx].pc+(g.tipo==="pc"?1:0)};}
        else{updated.push({name:g.nombre,team:rivalTeam||"",goals:1,pc:g.tipo==="pc"?1:0});}
      });
      const sorted=[...updated].sort((a,b)=>b.goals-a.goals);save(KEYS.scorers,sorted);return sorted;
    });
  }
  const nav=[{id:"home",label:"Inicio",icon:"home"},{id:"rivals",label:"Rivales",icon:"shield"},{id:"fixture",label:"Fixture",icon:"calendar"},{id:"standings",label:"Tabla",icon:"chart"},{id:"scorers",label:"Goles",icon:"trophy"},{id:"cards",label:"Tarjetas",icon:"flag"}];
  const navBtn=id=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 2px",background:"none",border:"none",cursor:"pointer",color:view===id?C.accent:C.gray,fontSize:9,fontWeight:700,fontFamily:FF,letterSpacing:0.4,borderTop:`2px solid ${view===id?C.accent:"transparent"}`,transition:"color 0.15s"});
  if(!loaded)return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{width:48,height:48,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.accent}`,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{color:C.gray,fontFamily:FF,letterSpacing:2,fontSize:14}}>CARGANDO...</p>
    </div>
  );
  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"/>
      <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Barlow',sans-serif",color:C.white,maxWidth:800,margin:"0 auto",display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"12px 18px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:100}}>
          <div style={{width:30,height:30,background:C.accent+"22",border:`2px solid ${C.accent}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏑</div>
          <div><div style={{fontSize:14,fontWeight:700,color:C.white,fontFamily:FF,letterSpacing:1,lineHeight:1.1}}>CULP HOCKEY</div><div style={{fontSize:9,color:C.gray,letterSpacing:0.8}}>ANÁLISIS DE RIVALES · PRIMERA DAMAS</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
            <Badge text={`${scorers.length} goleadoras`} color={C.purple}/>
          </div>
        </div>
        {/* Content */}
        <div style={{flex:1,padding:"18px 14px 80px",overflowY:"auto"}}>
          {view==="home"&&<Dashboard rivals={rivals} standings={standings} scorers={scorers} setView={setView}/>}
          {view==="rivals"&&!subview&&<RivalsView rivals={rivals} onNew={()=>{setSelected(null);setSubview("new");}} onView={r=>{setSelected(r);setSubview("detail");}} onEdit={r=>{setSelected(r);setSubview("edit");}} onDelete={deleteRival}/>}
          {view==="rivals"&&subview==="new"&&<RivalForm rival={null} onSave={saveRival} onCancel={()=>setSubview(null)} onUpdateScorers={updateScorersFromPlanilla}/>}
          {view==="rivals"&&subview==="edit"&&<RivalForm rival={selected} onSave={saveRival} onCancel={()=>{setSubview(null);setSelected(null);}} onUpdateScorers={updateScorersFromPlanilla}/>}
          {view==="rivals"&&subview==="detail"&&<RivalDetail rival={selected} onEdit={()=>setSubview("edit")} onBack={()=>{setSubview(null);setSelected(null);}}/>}
          {view==="standings"&&<StandingsView standings={standings} setStandings={setStandings}/>}
          {view==="scorers"&&<ScorersView scorers={scorers} setScorers={setScorers} rivals={rivals}/>}
          {view==="fixture"&&<FixtureView fixture={fixture} setFixture={setFixture} standings={standings} setStandings={setStandings} scorers={scorers} setScorers={setScorers} cards={cards} setCards={setCards} rivals={rivals} setRivals={setRivals}/>}
          {view==="cards"&&<CardsView cards={cards} setCards={setCards}/>}
        </div>
        {/* Bottom nav */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:800,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
          {nav.map(n=><button key={n.id} style={navBtn(n.id)} onClick={()=>{setView(n.id);setSubview(null);setSelected(null);}}><Icon name={n.icon} size={18}/>{n.label.toUpperCase()}</button>)}
        </div>
      </div>
    </>
  );
}
