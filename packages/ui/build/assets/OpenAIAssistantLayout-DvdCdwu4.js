import{P as m,b as N,r as e,j as t,D as G,q as H,t as M,B as u,S,T as b,v as V,A as W,u as z,M as U,w as Y,a4 as K,g as w}from"./index-YrBb95ol.js";import{I as Q}from"./ItemCard-BrAM2sIj.js";import{S as O}from"./StyledButton-DXZyQiwo.js";import{A as X}from"./AssistantDialog-Cum5uU6l.js";import{C as Z}from"./CredentialInputHandler-BzNGMmJx.js";import{D as _}from"./Dropdown-B8fdFRp4.js";import{a as B}from"./assistants-Wx-_qNk1.js";import{V as $}from"./ViewHeader-CCHuZACc.js";import{E as tt}from"./ErrorBoundary-CUY0ZYII.js";import{A as et}from"./assistant_empty-BAOmXGQM.js";import{I as st,S as D}from"./IconPlus-BaXmZWfM.js";import"./Grid-DjQ4cn3D.js";import"./TooltipWithParser-DKPjkixU.js";import"./IconSearch-D-OoqJyQ.js";import"./MultiDropdown-wxNqtYoC.js";import"./TextField-LGUd3qul.js";import"./OutlinedInput-BhZIIZoj.js";import"./FormControl-wstEAgUr.js";import"./Menu-B86QUi--.js";import"./Popover-BvGEjH7D.js";import"./File-DPjeuW7d.js";import"./BackdropLoader-CslNJVg7.js";import"./CircularProgress-BFk_RX-E.js";import"./ConfirmDialog-KE28Mtnw.js";import"./CredentialListDialog-IIU7ZM0n.js";import"./Input-B4-co-4L.js";import"./main-Dkicd77k.js";import"./v4-D8aEg3BZ.js";import"./StyledFab-DqqBf6Tt.js";import"./IconArrowLeft-ByFHgJ8H.js";import"./IconCopy-CsKaXIZ_.js";const L=({show:g,dialogProps:a,onCancel:h,onAssistantSelected:C,setError:c})=>{const p=document.getElementById("portal"),o=N(B.getAllAvailableAssistants),[i,x]=e.useState(""),[A,f]=e.useState([]),[l,j]=e.useState("");e.useEffect(()=>()=>{x(""),f([]),j("")},[a]),e.useEffect(()=>{if(o.data&&o.data.length){const r=[];for(let d=0;d<o.data.length;d+=1)r.push({label:o.data[d].name,name:o.data[d].id,description:o.data[d].instructions});f(r)}},[o.data]),e.useEffect(()=>{o.error&&c&&c(o.error)},[o.error]);const v=g?t.jsxs(G,{fullWidth:!0,maxWidth:"xs",open:g,onClose:h,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[t.jsx(H,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:a.title}),t.jsxs(M,{children:[t.jsxs(u,{sx:{p:2},children:[t.jsx(S,{sx:{position:"relative"},direction:"row",children:t.jsxs(b,{variant:"overline",children:["OpenAI Credential",t.jsx("span",{style:{color:"red"},children:" *"})]})}),t.jsx(Z,{data:i?{credential:i}:{},inputParam:{label:"Connect Credential",name:"credential",type:"credential",credentialNames:["openAIApi"]},onSelect:r=>{x(r),r&&o.request(r)}},i)]}),i&&t.jsxs(u,{sx:{p:2},children:[t.jsx(S,{sx:{position:"relative"},direction:"row",children:t.jsxs(b,{variant:"overline",children:["Assistants",t.jsx("span",{style:{color:"red"},children:" *"})]})}),t.jsx(_,{name:l,options:A,onSelect:r=>j(r),value:l??"choose an option"})]})]}),l&&t.jsx(V,{children:t.jsx(O,{variant:"contained",onClick:()=>C(l,i),children:"Load"})})]}):null;return W.createPortal(v,p)};L.propTypes={show:m.bool,dialogProps:m.object,onCancel:m.func,onAssistantSelected:m.func,setError:m.func};const kt=()=>{var y;const g=z(),a=N(B.getAllAssistants),[h,C]=e.useState(!0),[c,p]=e.useState(null),[o,i]=e.useState(!1),[x,A]=e.useState({}),[f,l]=e.useState(!1),[j,v]=e.useState({}),r=()=>{v({title:"Load Existing Assistant"}),l(!0)},[d,k]=e.useState(""),T=s=>{k(s.target.value)},q=(s,n)=>{l(!1),E(s,n)},E=(s,n)=>{A({title:"Add New Assistant",type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add",selectedOpenAIAssistantId:s,credential:n}),i(!0)},F=s=>{A({title:"Edit Assistant",type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Save",data:s}),i(!0)},J=()=>{i(!1),a.request("OPENAI")};function R(s){const n=JSON.parse(s.details);return n&&n.name&&n.name.toLowerCase().indexOf(d.toLowerCase())>-1}return e.useEffect(()=>{a.request("OPENAI")},[]),e.useEffect(()=>{C(a.loading)},[a.loading]),e.useEffect(()=>{a.error&&p(a.error)},[a.error]),t.jsxs(t.Fragment,{children:[t.jsx(U,{children:c?t.jsx(tt,{error:c}):t.jsxs(S,{flexDirection:"column",sx:{gap:3},children:[t.jsxs($,{isBackButton:!0,onSearchChange:T,search:!0,searchPlaceholder:"Search Assistants",title:"OpenAI Assistant",onBack:()=>g(-1),children:[t.jsx(Y,{variant:"outlined",onClick:r,startIcon:t.jsx(K,{}),sx:{borderRadius:2,height:40},children:"Load"}),t.jsx(O,{variant:"contained",sx:{borderRadius:2,height:40},onClick:E,startIcon:t.jsx(st,{}),children:"Add"})]}),h?t.jsxs(u,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:w,children:[t.jsx(D,{variant:"rounded",height:160}),t.jsx(D,{variant:"rounded",height:160}),t.jsx(D,{variant:"rounded",height:160})]}):t.jsx(u,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:w,children:a.data&&((y=a.data)==null?void 0:y.filter(R).map((s,n)=>{var I,P;return t.jsx(Q,{data:{name:(I=JSON.parse(s.details))==null?void 0:I.name,description:(P=JSON.parse(s.details))==null?void 0:P.instructions,iconSrc:s.iconSrc},onClick:()=>F(s)},n)}))}),!h&&(!a.data||a.data.length===0)&&t.jsxs(S,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[t.jsx(u,{sx:{p:2,height:"auto"},children:t.jsx("img",{style:{objectFit:"cover",height:"20vh",width:"auto"},src:et,alt:"AssistantEmptySVG"})}),t.jsx("div",{children:"No OpenAI Assistants Added Yet"})]})]})}),t.jsx(L,{show:f,dialogProps:j,onCancel:()=>l(!1),onAssistantSelected:q,setError:p}),t.jsx(X,{show:o,dialogProps:x,onCancel:()=>i(!1),onConfirm:J,setError:p})]})};export{kt as default};