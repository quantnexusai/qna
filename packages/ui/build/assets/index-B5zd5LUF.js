import{P as g,x as U,y as Q,r as i,z as de,H,j as e,D as X,q as K,ak as J,t as Z,B as I,T as F,v as he,A as ee,w as y,I as C,K as ae,L as te,s as se,N as xe,O as z,Q as ie,a as me,R as pe,b as ue,M as je,S as O,U as be,V as fe,W as ge,X as ye,Y as ve,C as De,$ as P}from"./index-DnRqwzUl.js";import{S as re}from"./StyledButton-UqN_3QZz.js";import{C as le,u as we}from"./ConfirmDialog-BByP0sN1.js";import{v as E}from"./variables-DtdXpBAF.js";import{D as Ve}from"./Dropdown--aEEoNmI.js";import{O as W}from"./OutlinedInput-BjbOs3SL.js";import{C as Y}from"./CodeEditor-Dz_1ga14.js";import{V as Ce}from"./ViewHeader-9nMyGl0H.js";import{E as Se}from"./ErrorBoundary-Cg9p9QiY.js";import{I as Te,S as n}from"./IconPlus-t_dssfTo.js";import{I as q,a as ke}from"./IconSearch-DuKTugus.js";import{I as Ae}from"./IconTrash-CLrlpA-z.js";import"./TextField-CWFlncnn.js";import"./FormControl-CwX-cgG8.js";import"./Menu-CKXvTZgV.js";import"./Popover-Bg7ct0u8.js";import"./StyledFab-ByxVeh_y.js";import"./IconArrowLeft-DlsmOOmz.js";import"./IconCopy-r160ectE.js";const Ie="/assets/variables_empty-BRQPFrO4.svg",Ee=[{label:"Static",name:"static",description:"Variable value will be read from the value entered below"},{label:"Runtime",name:"runtime",description:"Variable value will be read from .env file"}],oe=({show:r,dialogProps:l,onCancel:x,onConfirm:p,setError:u})=>{const T=document.getElementById("portal"),m=U();Q();const j=(...s)=>m(ae(...s)),b=(...s)=>m(te(...s)),[v,h]=i.useState(""),[D,f]=i.useState(""),[d,w]=i.useState("static"),[B,V]=i.useState("ADD"),[N,o]=i.useState({});i.useEffect(()=>(l.type==="EDIT"&&l.data?(h(l.data.name),f(l.data.value),w(l.data.type),V("EDIT"),o(l.data)):l.type==="ADD"&&(h(""),f(""),w("static"),V("ADD"),o({})),()=>{h(""),f(""),w("static"),V("ADD"),o({})}),[l]),i.useEffect(()=>(m(r?{type:de}:{type:H}),()=>m({type:H})),[r,m]);const R=async()=>{try{const s={name:v,value:D,type:d},c=await E.createVariable(s);c.data&&(j({message:"New Variable added",options:{key:new Date().getTime()+Math.random(),variant:"success",action:S=>e.jsx(y,{style:{color:"white"},onClick:()=>b(S),children:e.jsx(C,{})})}}),p(c.data.id))}catch(s){u&&u(s),j({message:`Failed to add new Variable: ${typeof error.response.data=="object"?error.response.data.message:error.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:c=>e.jsx(y,{style:{color:"white"},onClick:()=>b(c),children:e.jsx(C,{})})}}),x()}},M=async()=>{try{const s={name:v,value:D,type:d},c=await E.updateVariable(N.id,s);c.data&&(j({message:"Variable saved",options:{key:new Date().getTime()+Math.random(),variant:"success",action:S=>e.jsx(y,{style:{color:"white"},onClick:()=>b(S),children:e.jsx(C,{})})}}),p(c.data.id))}catch(s){u&&u(err),j({message:`Failed to save Variable: ${typeof s.response.data=="object"?s.response.data.message:s.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:c=>e.jsx(y,{style:{color:"white"},onClick:()=>b(c),children:e.jsx(C,{})})}}),x()}},L=r?e.jsxs(X,{fullWidth:!0,maxWidth:"sm",open:r,onClose:x,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(K,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:e.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(J,{style:{marginRight:"10px"}}),l.type==="ADD"?"Add Variable":"Edit Variable"]})}),e.jsxs(Z,{children:[e.jsxs(I,{sx:{p:2},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsxs(F,{children:["Variable Name",e.jsx("span",{style:{color:"red"},children:" *"})]}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsx(W,{size:"small",sx:{mt:1},type:"string",fullWidth:!0,onChange:s=>h(s.target.value),value:v??"",id:"txtInput_variableName"},"variableName")]}),e.jsxs(I,{sx:{p:2},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsxs(F,{children:["Type",e.jsx("span",{style:{color:"red"},children:" *"})]}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsx(Ve,{name:"variableType",options:Ee,onSelect:s=>w(s),value:d??"choose an option",id:"dropdown_variableType"},d)]}),d==="static"&&e.jsxs(I,{sx:{p:2},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"row"},children:[e.jsxs(F,{children:["Value",e.jsx("span",{style:{color:"red"},children:" *"})]}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsx(W,{size:"small",sx:{mt:1},type:"string",fullWidth:!0,onChange:s=>f(s.target.value),value:D??"",id:"txtInput_variableValue"},"variableValue")]})]}),e.jsx(he,{children:e.jsx(re,{disabled:!v||!d||d==="static"&&!D,variant:"contained",onClick:()=>B==="ADD"?R():M(),id:"btn_confirmAddingNewVariable",children:l.confirmButtonName})}),e.jsx(le,{})]}):null;return ee.createPortal(L,T)};oe.propTypes={show:g.bool,dialogProps:g.object,onCancel:g.func,onConfirm:g.func,setError:g.func};const Be=`{
    overrideConfig: {
        vars: {
            var1: 'abc'
        }
    }
}`,ne=({show:r,onCancel:l})=>{const x=document.getElementById("portal"),p=r?e.jsxs(X,{onClose:l,open:r,fullWidth:!0,maxWidth:"sm","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(K,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:"How To Use Variables"}),e.jsxs(Z,{children:[e.jsx("p",{style:{marginBottom:"10px"},children:"Variables can be used in Custom Tool, Custom Function, Custom Loader, If Else Function with the $ prefix."}),e.jsx(Y,{disabled:!0,value:"$vars.<variable-name>",height:"50px",theme:"dark",lang:"js",basicSetup:{highlightActiveLine:!1,highlightActiveLineGutter:!1}}),e.jsx("p",{style:{marginBottom:"10px"},children:"Variables can also be used in Text Field parameter of any node. For example, in System Message of Agent:"}),e.jsx(Y,{disabled:!0,value:"You are a {{$vars.personality}} AI assistant",height:"50px",theme:"dark",lang:"js",basicSetup:{highlightActiveLine:!1,highlightActiveLineGutter:!1}}),e.jsx("p",{style:{marginBottom:"10px"},children:"If variable type is Static, the value will be retrieved as it is. If variable type is Runtime, the value will be retrieved from .env file."}),e.jsxs("p",{style:{marginBottom:"10px"},children:["You can also override variable values in API overrideConfig using ",e.jsx("b",{children:"vars"}),":"]}),e.jsx(Y,{disabled:!0,value:Be,height:"170px",theme:"dark",lang:"js",basicSetup:{highlightActiveLine:!1,highlightActiveLineGutter:!1}}),e.jsxs("p",{children:["Read more from"," ",e.jsx("a",{target:"_blank",rel:"noreferrer",href:"https://docs.flowiseai.com/using-flowise/variables",children:"docs"})]})]})]}):null;return ee.createPortal(p,x)};ne.propTypes={show:g.bool,onCancel:g.func};const a=se(xe)(({theme:r})=>({borderColor:r.palette.grey[900]+25,[`&.${z.head}`]:{color:r.palette.grey[900]},[`&.${z.body}`]:{fontSize:14,height:64}})),_=se(ie)(()=>({"&:last-child td, &:last-child th":{border:0}})),Ze=()=>{const r=me(),l=pe(t=>t.customization),x=U();Q();const p=(...t)=>x(ae(...t)),u=(...t)=>x(te(...t)),[T,m]=i.useState(!0),[j,b]=i.useState(null),[v,h]=i.useState(!1),[D,f]=i.useState({}),[d,w]=i.useState([]),[B,V]=i.useState(!1),{confirm:N}=we(),o=ue(E.getAllVariables),[R,M]=i.useState(""),L=t=>{M(t.target.value)};function s(t){return t.name.toLowerCase().indexOf(R.toLowerCase())>-1}const c=()=>{f({type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add",customBtnId:"btn_confirmAddingVariable",data:{}}),h(!0)},S=t=>{f({type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Save",data:t}),h(!0)},ce=async t=>{const k={title:"Delete",description:`Delete variable ${t.name}?`,confirmButtonName:"Delete",cancelButtonName:"Cancel"};if(await N(k))try{(await E.deleteVariable(t.id)).data&&(p({message:"Variable deleted",options:{key:new Date().getTime()+Math.random(),variant:"success",action:$=>e.jsx(y,{style:{color:"white"},onClick:()=>u($),children:e.jsx(C,{})})}}),G())}catch(A){p({message:`Failed to delete Variable: ${typeof A.response.data=="object"?A.response.data.message:A.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:$=>e.jsx(y,{style:{color:"white"},onClick:()=>u($),children:e.jsx(C,{})})}})}},G=()=>{h(!1),o.request()};return i.useEffect(()=>{o.request()},[]),i.useEffect(()=>{m(o.loading)},[o.loading]),i.useEffect(()=>{o.error&&b(o.error)},[o.error]),i.useEffect(()=>{o.data&&w(o.data)},[o.data]),e.jsxs(e.Fragment,{children:[e.jsx(je,{children:j?e.jsx(Se,{error:j}):e.jsxs(O,{flexDirection:"column",sx:{gap:3},children:[e.jsxs(Ce,{onSearchChange:L,search:!0,searchPlaceholder:"Search Variables",title:"Variables",children:[e.jsx(y,{variant:"outlined",sx:{borderRadius:2,height:"100%"},onClick:()=>V(!0),children:"How To Use"}),e.jsx(re,{variant:"contained",sx:{borderRadius:2,height:"100%"},onClick:c,startIcon:e.jsx(Te,{}),id:"btn_createVariable",children:"Add Variable"})]}),!T&&d.length===0?e.jsxs(O,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[e.jsx(I,{sx:{p:2,height:"auto"},children:e.jsx("img",{style:{objectFit:"cover",height:"20vh",width:"auto"},src:Ie,alt:"VariablesEmptySVG"})}),e.jsx("div",{children:"No Variables Yet"})]}):e.jsx(be,{sx:{border:1,borderColor:r.palette.grey[900]+25,borderRadius:2},component:fe,children:e.jsxs(ge,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(ye,{sx:{backgroundColor:l.isDarkMode?r.palette.common.black:r.palette.grey[100],height:56},children:e.jsxs(ie,{children:[e.jsx(a,{children:"Name"}),e.jsx(a,{children:"Value"}),e.jsx(a,{children:"Type"}),e.jsx(a,{children:"Last Updated"}),e.jsx(a,{children:"Created"}),e.jsx(a,{children:" "}),e.jsx(a,{children:" "})]})}),e.jsx(ve,{children:T?e.jsxs(e.Fragment,{children:[e.jsxs(_,{children:[e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})})]}),e.jsxs(_,{children:[e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})}),e.jsx(a,{children:e.jsx(n,{variant:"text"})})]})]}):e.jsx(e.Fragment,{children:d.filter(s).map((t,k)=>e.jsxs(_,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(a,{component:"th",scope:"row",children:e.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx("div",{style:{width:25,height:25,marginRight:10,borderRadius:"50%"},children:e.jsx(J,{style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"contain"}})}),t.name]})}),e.jsx(a,{children:t.value}),e.jsx(a,{children:e.jsx(De,{color:t.type==="static"?"info":"secondary",size:"small",label:t.type})}),e.jsx(a,{children:P(t.updatedDate).format("MMMM Do, YYYY")}),e.jsx(a,{children:P(t.createdDate).format("MMMM Do, YYYY")}),e.jsx(a,{children:e.jsx(q,{title:"Edit",color:"primary",onClick:()=>S(t),children:e.jsx(ke,{})})}),e.jsx(a,{children:e.jsx(q,{title:"Delete",color:"error",onClick:()=>ce(t),children:e.jsx(Ae,{})})})]},k))})})]})})]})}),e.jsx(oe,{show:v,dialogProps:D,onCancel:()=>h(!1),onConfirm:G,setError:b}),e.jsx(ne,{show:B,onCancel:()=>V(!1)}),e.jsx(le,{})]})};export{Ze as default};