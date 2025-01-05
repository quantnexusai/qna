import{s as re,M as V,P as v,a as _,R as G,j as e,B as x,T as b,al as M,u as oe,b as se,r as n,c as ie,S as A,g as N,U as ne,V as ae,W as le,X as de,Q as O,N as s,Y as ce}from"./index-YrBb95ol.js";import{D as F,I as xe,A as he}from"./AddDocStoreDialog-DK6YkuVm.js";import{G as P}from"./Grid-DjQ4cn3D.js";import{I as pe}from"./IconLanguage-Csaj12yt.js";import{I as ge}from"./IconScissors-BrNFkutG.js";import{T as E,S as ue}from"./StyledButton-DXZyQiwo.js";import{E as me}from"./ErrorBoundary-CUY0ZYII.js";import{V as fe}from"./ViewHeader-CCHuZACc.js";import{d as je}from"./documentstore-DL5qOG7D.js";import{T as be,I as we,a as ye}from"./IconList-DkcScsxC.js";import{I as Se,S as k}from"./IconPlus-BaXmZWfM.js";import"./ConfirmDialog-KE28Mtnw.js";import"./OutlinedInput-BhZIIZoj.js";import"./IconSearch-D-OoqJyQ.js";import"./IconCopy-CsKaXIZ_.js";import"./StyledFab-DqqBf6Tt.js";import"./IconArrowLeft-ByFHgJ8H.js";const Ce=re(V)(({theme:r})=>({background:r.palette.card.main,color:r.darkTextPrimary,overflow:"auto",position:"relative",boxShadow:"0 2px 14px 0 rgb(32 40 45 / 8%)",cursor:"pointer","&:hover":{background:r.palette.card.hover,boxShadow:"0 2px 14px 0 rgb(32 40 45 / 20%)"},height:"100%",minHeight:"160px",maxHeight:"300px",width:"100%",overflowWrap:"break-word",whiteSpace:"pre-line"})),H=({data:r,images:a,onClick:y})=>{var w,f;const i=_(),h=G(m=>m.customization);return e.jsx(Ce,{content:!1,onClick:y,sx:{border:1,borderColor:i.palette.grey[900]+25,borderRadius:2},children:e.jsx(x,{sx:{height:"100%",p:2.25},children:e.jsxs(P,{container:!0,justifyContent:"space-between",direction:"column",sx:{height:"100%"},gap:2,children:[e.jsxs(x,{display:"flex",flexDirection:"column",sx:{flex:1,width:"100%"},children:[e.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",overflow:"hidden"},children:[e.jsx(b,{sx:{display:"-webkit-box",fontSize:"1.25rem",fontWeight:500,WebkitLineClamp:2,WebkitBoxOrient:"vertical",textOverflow:"ellipsis",overflow:"hidden",flex:1,mr:1},children:r.name}),e.jsx(F,{status:r.status})]}),e.jsx("span",{style:{display:"-webkit-box",marginTop:10,overflowWrap:"break-word",WebkitLineClamp:2,WebkitBoxOrient:"vertical",textOverflow:"ellipsis",overflow:"hidden"},children:r.description||" "})]}),e.jsxs(P,{container:!0,columnGap:2,rowGap:1,children:[e.jsxs("div",{style:{paddingLeft:"7px",paddingRight:"7px",paddingTop:"3px",paddingBottom:"3px",fontSize:"11px",width:"max-content",borderRadius:"25px",boxShadow:h.isDarkMode?"0 2px 14px 0 rgb(255 255 255 / 20%)":"0 2px 14px 0 rgb(32 40 45 / 20%)",display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(xe,{style:{marginRight:5},size:15}),((w=r.whereUsed)==null?void 0:w.length)??0," ",((f=r.whereUsed)==null?void 0:f.length)<=1?"flow":"flows"]}),e.jsxs("div",{style:{paddingLeft:"7px",paddingRight:"7px",paddingTop:"3px",paddingBottom:"3px",fontSize:"11px",width:"max-content",borderRadius:"25px",boxShadow:h.isDarkMode?"0 2px 14px 0 rgb(255 255 255 / 20%)":"0 2px 14px 0 rgb(32 40 45 / 20%)",display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(pe,{style:{marginRight:5},size:15}),M(r.totalChars??0)," chars"]}),e.jsxs("div",{style:{paddingLeft:"7px",paddingRight:"7px",paddingTop:"3px",paddingBottom:"3px",fontSize:"11px",width:"max-content",borderRadius:"25px",boxShadow:h.isDarkMode?"0 2px 14px 0 rgb(255 255 255 / 20%)":"0 2px 14px 0 rgb(32 40 45 / 20%)",display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(ge,{style:{marginRight:5},size:15}),M(r.totalChunks??0)," chunks"]})]}),a&&a.length>0&&e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:1},children:[a.slice(0,a.length>3?3:a.length).map(m=>e.jsx(x,{sx:{width:30,height:30,borderRadius:"50%",backgroundColor:h.isDarkMode?i.palette.common.white:i.palette.grey[300]+75},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:5,objectFit:"contain"},alt:"",src:m})},m)),a.length>3&&e.jsxs(b,{sx:{alignItems:"center",display:"flex",fontSize:".9rem",fontWeight:200},children:["+ ",a.length-3," More"]})]})]})})})};H.propTypes={data:v.object,images:v.array,onClick:v.func};const ve="/assets/doc_store_empty-B0My5Ox8.svg",Ge=()=>{var R,B;const r=_(),a=G(t=>t.customization),y=oe(),i=se(je.getAllDocumentStores),[h,w]=n.useState(null),[f,m]=n.useState(!0),[p,U]=n.useState({}),[q,Y]=n.useState(""),[D,S]=n.useState(!1),[$,Q]=n.useState({}),[d,X]=n.useState([]),[C,J]=n.useState(localStorage.getItem("docStoreDisplayStyle")||"card"),K=(t,l)=>{l!==null&&(localStorage.setItem("docStoreDisplayStyle",l),J(l))};function I(t){return t.name.toLowerCase().indexOf(q.toLowerCase())>-1}const Z=t=>{Y(t.target.value)},T=t=>{y("/document-stores/"+t)},ee=()=>{Q({title:"Add New Document Store",type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add"}),S(!0)},te=()=>{S(!1),i.request()};return n.useEffect(()=>{i.request()},[]),n.useEffect(()=>{var t,l;if(i.data)try{const o=i.data;if(!Array.isArray(o))return;const g={};for(let c=0;c<o.length;c+=1){const u=o[c].loaders??[];let L=0,z=0;g[o[c].id]=[];for(let j=0;j<u.length;j+=1){const W=`${ie}/api/v1/node-icon/${u[j].loaderId}`;g[o[c].id].includes(W)||g[o[c].id].push(W),L+=((t=u[j])==null?void 0:t.totalChunks)??0,z+=((l=u[j])==null?void 0:l.totalChars)??0}o[c].totalDocs=(u==null?void 0:u.length)??0,o[c].totalChunks=L,o[c].totalChars=z}X(o),U(g)}catch(o){console.error(o)}},[i.data]),n.useEffect(()=>{m(i.loading)},[i.loading]),n.useEffect(()=>{w(i.error)},[i.error]),e.jsxs(V,{children:[h?e.jsx(me,{error:h}):e.jsxs(A,{flexDirection:"column",sx:{gap:3},children:[e.jsxs(fe,{onSearchChange:Z,search:!0,searchPlaceholder:"Search Name",title:"Document Store",children:[e.jsxs(be,{sx:{borderRadius:2,maxHeight:40},value:C,color:"primary",exclusive:!0,onChange:K,children:[e.jsx(E,{sx:{borderColor:r.palette.grey[900]+25,borderRadius:2,color:(R=r==null?void 0:r.customization)!=null&&R.isDarkMode?"white":"inherit"},variant:"contained",value:"card",title:"Card View",children:e.jsx(we,{})}),e.jsx(E,{sx:{borderColor:r.palette.grey[900]+25,borderRadius:2,color:(B=r==null?void 0:r.customization)!=null&&B.isDarkMode?"white":"inherit"},variant:"contained",value:"list",title:"List View",children:e.jsx(ye,{})})]}),e.jsx(ue,{variant:"contained",sx:{borderRadius:2,height:"100%"},onClick:ee,startIcon:e.jsx(Se,{}),id:"btn_createVariable",children:"Add New"})]}),!C||C==="card"?e.jsx(e.Fragment,{children:f&&!d?e.jsxs(x,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:N,children:[e.jsx(k,{variant:"rounded",height:160}),e.jsx(k,{variant:"rounded",height:160}),e.jsx(k,{variant:"rounded",height:160})]}):e.jsx(x,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:N,children:d==null?void 0:d.filter(I).map((t,l)=>e.jsx(H,{images:p[t.id],data:t,onClick:()=>T(t.id)},l))})}):e.jsx(ne,{sx:{border:1,borderColor:r.palette.grey[900]+25,borderRadius:2},component:ae,children:e.jsxs(le,{"aria-label":"documents table",children:[e.jsx(de,{sx:{backgroundColor:a.isDarkMode?r.palette.common.black:r.palette.grey[100],height:56},children:e.jsxs(O,{children:[e.jsx(s,{children:" "}),e.jsx(s,{children:"Name"}),e.jsx(s,{children:"Description"}),e.jsx(s,{children:"Connected flows"}),e.jsx(s,{children:"Total characters"}),e.jsx(s,{children:"Total chunks"}),e.jsx(s,{children:"Loader types"})]})}),e.jsx(ce,{children:d==null?void 0:d.filter(I).map((t,l)=>{var o;return e.jsxs(O,{onClick:()=>T(t.id),hover:!0,sx:{cursor:"pointer","&:last-child td, &:last-child th":{border:0}},children:[e.jsx(s,{align:"center",children:e.jsx(F,{isTableView:!0,status:t.status})}),e.jsx(s,{children:e.jsx(b,{sx:{display:"-webkit-box",WebkitLineClamp:5,WebkitBoxOrient:"vertical",textOverflow:"ellipsis",overflow:"hidden"},children:t.name})}),e.jsx(s,{children:e.jsx(b,{sx:{display:"-webkit-box",WebkitLineClamp:5,WebkitBoxOrient:"vertical",textOverflow:"ellipsis",overflow:"hidden"},children:t==null?void 0:t.description})}),e.jsx(s,{children:((o=t.whereUsed)==null?void 0:o.length)??0}),e.jsx(s,{children:t.totalChars}),e.jsx(s,{children:t.totalChunks}),e.jsx(s,{children:p[t.id]&&e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:1},children:[p[t.id].slice(0,p.length>3?3:p.length).map(g=>e.jsx(x,{sx:{width:30,height:30,borderRadius:"50%",backgroundColor:a.isDarkMode?r.palette.common.white:r.palette.grey[300]+75},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:5,objectFit:"contain"},alt:"",src:g})},g)),p.length>3&&e.jsxs(b,{sx:{alignItems:"center",display:"flex",fontSize:".9rem",fontWeight:200},children:["+ ",p.length-3," More"]})]})})]},l)})})]})}),!f&&(!d||d.length===0)&&e.jsxs(A,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[e.jsx(x,{sx:{p:2,height:"auto"},children:e.jsx("img",{style:{objectFit:"cover",height:"20vh",width:"auto"},src:ve,alt:"doc_store_empty"})}),e.jsx("div",{children:"No Document Stores Created Yet"})]})]}),D&&e.jsx(he,{dialogProps:$,show:D,onCancel:()=>S(!1),onConfirm:te})]})};export{Ge as default};