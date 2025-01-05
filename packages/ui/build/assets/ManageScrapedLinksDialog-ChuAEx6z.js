import{a3 as q,s as A,P as x,r as c,bx as X,ah as P,j as e,w as D,e as K,f as Q,_ as R,i as M,a7 as Y,bC as Z,k as tt,l as et,bD as nt,n as at,a as ot,x as F,R as it,b as st,z as W,H as $,D as U,t as O,T as w,aM as _,v as H,A as V,aE as lt,y as rt,q as dt,B,S as ct,I as T,K as ut,L as gt}from"./index-YrBb95ol.js";import{d as pt}from"./Delete-BF9vyW48.js";import{I as ht}from"./IconPlus-BaXmZWfM.js";import{D as ft,G as xt}from"./DataGrid-DWwuEQgy.js";import{S as J}from"./StyledButton-DXZyQiwo.js";import{C as N}from"./CodeEditor-tl_RgJZo.js";import{n as mt}from"./nodes-BVY53Wx2.js";import{C as yt}from"./CircularProgress-BFk_RX-E.js";import{B as bt}from"./BackdropLoader-CslNJVg7.js";import{F as jt}from"./FormControl-wstEAgUr.js";import{O as z}from"./OutlinedInput-BhZIIZoj.js";import{I as It}from"./IconSearch-D-OoqJyQ.js";import{I as kt}from"./IconTrash-Ssd3AIfJ.js";/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var vt=q("outline","eraser","IconEraser",[["path",{d:"M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3",key:"svg-0"}],["path",{d:"M18 13.3l-6.3 -6.3",key:"svg-1"}]]);const Ct=A(ft)(({theme:n})=>({border:`1px solid ${n.palette.mode==="light"?"#b4b4b4":"#303030"}`,letterSpacing:"normal","& .MuiDataGrid-columnsContainer":{backgroundColor:n.palette.mode==="light"?"#fafafa":"#1d1d1d"},"& .MuiDataGrid-iconSeparator":{display:"none"},"& .MuiDataGrid-columnHeader, .MuiDataGrid-cell":{borderRight:`1px solid ${n.palette.mode==="light"?"#f0f0f0":"#303030"}`},"& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell":{borderBottom:`1px solid ${n.palette.mode==="light"?"#f0f0f0":"#303030"}`},"& .MuiPaginationItem-root":{borderRadius:0},"& .MuiDataGrid-columnHeader:last-child, .MuiDataGrid-cell:last-child":{borderRight:"none"}})),Lt=({columns:n,rows:t,style:h,disabled:k=!1,hideFooter:v=!1,onChange:g})=>{const[j,m]=c.useState(X(t)??[]),C=c.useCallback(a=>()=>{let o=[];m(s=>{let p=[...P.cloneDeep(s)];return p=p.filter(f=>f.id!==a),o=p,p}),g(JSON.stringify(o))},[]),u=(a=>[...a,{field:"actions",type:"actions",width:80,getActions:o=>[e.jsx(xt,{icon:e.jsx(pt,{}),label:"Delete",onClick:C(o.id)},"Delete")]}])(n),i=a=>{let o=[];return m(s=>{let p=[...P.cloneDeep(s)];const f=p.findIndex(d=>d.id===a.id);return f>=0&&(p[f]={...a}),o=p,p}),g(JSON.stringify(o)),a},y=()=>{var o;const a={};for(let s=0;s<u.length;s+=1)a[(o=u[s])==null?void 0:o.field]="";return a},b=()=>{m(a=>{let o=[...P.cloneDeep(a)];const s=o.length?o[o.length-1].id+1:1;return o.push({...y(),id:s}),o})};return e.jsxs(e.Fragment,{children:[j&&u&&e.jsx("div",{style:{marginTop:10,height:210,width:"100%",...h},children:e.jsx(Ct,{processRowUpdate:i,isCellEditable:()=>!k,hideFooter:v,onProcessRowUpdateError:a=>console.error(a),rows:j,columns:u})}),!k&&e.jsx(D,{sx:{mt:1},variant:"outlined",onClick:b,startIcon:e.jsx(ht,{}),children:"Add Item"})]})};Lt.propTypes={rows:x.array,columns:x.array,style:x.any,disabled:x.bool,hideFooter:x.bool,onChange:x.func};function Dt(n){return Q("MuiLoadingButton",n)}const Et=K("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),L=Et,St=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],Rt=n=>{const{loading:t,loadingPosition:h,classes:k}=n,v={root:["root",t&&"loading"],startIcon:[t&&`startIconLoading${M(h)}`],endIcon:[t&&`endIconLoading${M(h)}`],loadingIndicator:["loadingIndicator",t&&`loadingIndicator${M(h)}`]},g=at(v,Dt,k);return R({},k,g)},Bt=n=>n!=="ownerState"&&n!=="theme"&&n!=="sx"&&n!=="as"&&n!=="classes",Mt=A(D,{shouldForwardProp:n=>Bt(n)||n==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(n,t)=>[t.root,t.startIconLoadingStart&&{[`& .${L.startIconLoadingStart}`]:t.startIconLoadingStart},t.endIconLoadingEnd&&{[`& .${L.endIconLoadingEnd}`]:t.endIconLoadingEnd}]})(({ownerState:n,theme:t})=>R({[`& .${L.startIconLoadingStart}, & .${L.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},n.loadingPosition==="center"&&{transition:t.transitions.create(["background-color","box-shadow","border-color"],{duration:t.transitions.duration.short}),[`&.${L.loading}`]:{color:"transparent"}},n.loadingPosition==="start"&&n.fullWidth&&{[`& .${L.startIconLoadingStart}, & .${L.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginRight:-8}},n.loadingPosition==="end"&&n.fullWidth&&{[`& .${L.startIconLoadingStart}, & .${L.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginLeft:-8}})),$t=A("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(n,t)=>{const{ownerState:h}=n;return[t.loadingIndicator,t[`loadingIndicator${M(h.loadingPosition)}`]]}})(({theme:n,ownerState:t})=>R({position:"absolute",visibility:"visible",display:"flex"},t.loadingPosition==="start"&&(t.variant==="outlined"||t.variant==="contained")&&{left:t.size==="small"?10:14},t.loadingPosition==="start"&&t.variant==="text"&&{left:6},t.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(n.vars||n).palette.action.disabled},t.loadingPosition==="end"&&(t.variant==="outlined"||t.variant==="contained")&&{right:t.size==="small"?10:14},t.loadingPosition==="end"&&t.variant==="text"&&{right:6},t.loadingPosition==="start"&&t.fullWidth&&{position:"relative",left:-10},t.loadingPosition==="end"&&t.fullWidth&&{position:"relative",right:-10})),Pt=c.forwardRef(function(t,h){const k=c.useContext(Y),v=Z(k,t),g=tt({props:v,name:"MuiLoadingButton"}),{children:j,disabled:m=!1,id:C,loading:I=!1,loadingIndicator:u,loadingPosition:i="center",variant:y="text"}=g,b=et(g,St),a=nt(C),o=u??e.jsx(yt,{"aria-labelledby":a,color:"inherit",size:16}),s=R({},g,{disabled:m,loading:I,loadingIndicator:o,loadingPosition:i,variant:y}),p=Rt(s),f=I?e.jsx($t,{className:p.loadingIndicator,ownerState:s,children:o}):null;return e.jsxs(Mt,R({disabled:m||I,id:a,ref:h},b,{variant:y,classes:p,ownerState:s,children:[s.loadingPosition==="end"?j:f,s.loadingPosition==="end"?f:j]}))}),wt=Pt,At=({show:n,dialogProps:t,onCancel:h,onInputHintDialogClicked:k,onConfirm:v})=>{const g=document.getElementById("portal"),j=ot(),m=F(),C=it(l=>l.customization),[I,u]=c.useState(""),[i,y]=c.useState(null),[b,a]=c.useState("json"),[o,s]=c.useState(!1),[p,f]=c.useState(""),d=st(mt.executeCustomFunctionNode);c.useEffect(()=>(t.value&&u(t.value),t.inputParam&&(y(t.inputParam),t.inputParam.type==="code"&&a("js")),t.languageType&&a(t.languageType),()=>{u(""),s(!1),y(null),a("json"),f("")}),[t]),c.useEffect(()=>(m(n?{type:W}:{type:$}),()=>m({type:$})),[n,m]),c.useEffect(()=>{s(d.loading)},[d.loading]),c.useEffect(()=>{d.data&&(typeof d.data=="object"?f(JSON.stringify(d.data,null,2)):f(d.data))},[d.data]),c.useEffect(()=>{var l,E,S,G;d.error&&(typeof d.error=="object"&&((E=(l=d.error)==null?void 0:l.response)!=null&&E.data)?f(JSON.stringify((G=(S=d.error)==null?void 0:S.response)==null?void 0:G.data,null,2)):typeof d.error=="string"&&f(d.error))},[d.error]);const r=n?e.jsxs(U,{open:n,fullWidth:!0,maxWidth:"md","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsxs(O,{children:[e.jsx("div",{style:{display:"flex",flexDirection:"row"},children:i&&(i.type==="string"||i.type==="code")&&e.jsxs("div",{style:{flex:70},children:[e.jsxs("div",{style:{marginBottom:"10px",display:"flex",flexDirection:"row"},children:[e.jsx(w,{variant:"h4",children:i.label}),e.jsx("div",{style:{flex:1}}),i.hint&&e.jsx(D,{sx:{p:0,px:2},color:"secondary",variant:"text",onClick:()=>{k(i.hint)},children:i.hint.label})]}),e.jsx(_,{style:{border:"1px solid",borderColor:j.palette.grey[500],borderRadius:"12px",height:"100%",maxHeight:b==="js"?"calc(100vh - 330px)":"calc(100vh - 220px)",overflowX:"hidden",backgroundColor:"white"},children:e.jsx(N,{disabled:t.disabled,value:I,height:b==="js"?"calc(100vh - 330px)":"calc(100vh - 220px)",theme:C.isDarkMode?"dark":"light",lang:b,placeholder:i.placeholder,basicSetup:b!=="js"?{lineNumbers:!1,foldGutter:!1,autocompletion:!1,highlightActiveLine:!1}:{},onValueChange:l=>u(l)})})]})}),b==="js"&&!i.hideCodeExecute&&e.jsx(wt,{sx:{mt:2,"&:hover":{backgroundColor:j.palette.secondary.main,backgroundImage:"linear-gradient(rgb(0 0 0/10%) 0 0)"},"&:disabled":{backgroundColor:j.palette.secondary.main,backgroundImage:"linear-gradient(rgb(0 0 0/50%) 0 0)"}},loading:o,variant:"contained",fullWidth:!0,color:"secondary",onClick:()=>{s(!0),d.request({javascriptFunction:I})},children:"Execute"}),p&&e.jsx("div",{style:{marginTop:"15px"},children:e.jsx(N,{disabled:!0,value:p.toString(),height:"max-content",theme:C.isDarkMode?"dark":"light",lang:"js",basicSetup:{lineNumbers:!1,foldGutter:!1,autocompletion:!1,highlightActiveLine:!1}})})]}),e.jsxs(H,{children:[e.jsx(D,{onClick:h,children:t.cancelButtonName}),e.jsx(J,{disabled:t.disabled,variant:"contained",onClick:()=>v(I,i.name),children:t.confirmButtonName})]})]}):null;return V.createPortal(r,g)};At.propTypes={show:x.bool,dialogProps:x.object,onCancel:x.func,onConfirm:x.func,onInputHintDialogClicked:x.func};const Gt=(n,t,h)=>lt.get(`/fetch-links?url=${encodeURIComponent(n)}&relativeLinksMethod=${t}&limit=${h}`),Tt={fetchLinks:Gt},Nt=({show:n,dialogProps:t,onCancel:h,onSave:k})=>{const v=document.getElementById("portal"),g=F();rt();const j=(...r)=>g(ut(...r)),m=(...r)=>g(gt(...r)),[C,I]=c.useState(!1),[u,i]=c.useState([]),[y,b]=c.useState("");c.useEffect(()=>(t.url&&b(t.url),t.selectedLinks&&i(t.selectedLinks),()=>{I(!1),i([]),b("")}),[t]),c.useEffect(()=>(g(n?{type:W}:{type:$}),()=>g({type:$})),[n,g]);const a=async()=>{I(!0);try{const r=await Tt.fetchLinks(y,t.relativeLinksMethod,t.limit);r.data&&(i(r.data.links),j({message:"Successfully fetched links",options:{key:new Date().getTime()+Math.random(),variant:"success",action:l=>e.jsx(D,{style:{color:"white"},onClick:()=>m(l),children:e.jsx(T,{})})}}))}catch(r){j({message:typeof r.response.data=="object"?r.response.data.message:r.response.data,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:l=>e.jsx(D,{style:{color:"white"},onClick:()=>m(l),children:e.jsx(T,{})})}})}I(!1)},o=(r,l)=>{const{value:E}=l.target,S=[...u];S[r]=E,i(S)},s=r=>{const l=[...u];l.splice(r,1),i(l)},p=()=>{i([])},f=()=>{k(y,u)},d=n?e.jsxs(U,{onClose:h,open:n,fullWidth:!0,maxWidth:"sm","aria-labelledby":"manage-scraped-links-dialog-title","aria-describedby":"manage-scraped-links-dialog-description",children:[e.jsx(dt,{sx:{fontSize:"1rem"},id:"manage-scraped-links-dialog-title",children:t.title||`Manage Scraped Links - ${y}`}),e.jsxs(O,{children:[e.jsx(B,{sx:{mb:4},children:e.jsxs(ct,{flexDirection:"row",gap:1,sx:{width:"100%"},children:[e.jsx(jt,{sx:{mt:1,width:"100%",display:"flex",flexShrink:1},size:"small",children:e.jsx(z,{id:"url",size:"small",type:"text",value:y,name:"url",onChange:r=>{b(r.target.value)}})}),e.jsx(D,{disabled:!y,sx:{borderRadius:"12px",mt:1,display:"flex",flexShrink:0},size:"small",variant:"contained",onClick:a,children:"Fetch Links"})]})}),e.jsxs(B,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",mb:1.5},children:[e.jsx(w,{sx:{fontWeight:500},children:"Scraped Links"}),u.length>0?e.jsx(D,{sx:{height:"max-content",width:"max-content"},variant:"outlined",color:"error",title:"Clear All Links",onClick:p,startIcon:e.jsx(vt,{}),children:"Clear All"}):null]}),e.jsxs(e.Fragment,{children:[C&&e.jsx(bt,{open:C}),u.length>0?e.jsx(_,{style:{height:"100%",maxHeight:"320px",overflowX:"hidden",display:"flex",flexDirection:"column",gap:4},children:u.map((r,l)=>e.jsxs("div",{style:{display:"flex",width:"100%"},children:[e.jsx(B,{sx:{display:"flex",width:"100%"},children:e.jsx(z,{sx:{width:"100%"},type:"text",onChange:E=>o(l,E),size:"small",value:r,name:`link_${l}`},l)}),e.jsx(B,{sx:{width:"auto",flexGrow:1},children:e.jsx(It,{sx:{height:30,width:30},size:"small",color:"error",onClick:()=>s(l),edge:"end",children:e.jsx(kt,{})})})]},l))}):e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(w,{sx:{my:2},children:"Links scraped from the URL will appear here"})})]})]}),e.jsxs(H,{children:[e.jsx(D,{onClick:h,children:"Cancel"}),e.jsx(J,{variant:"contained",onClick:f,children:"Save"})]})]}):null;return V.createPortal(d,v)};Nt.propTypes={show:x.bool,dialogProps:x.object,onCancel:x.func,onSave:x.func};export{Lt as D,At as E,vt as I,wt as L,Nt as M};