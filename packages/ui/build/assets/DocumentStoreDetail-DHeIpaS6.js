import{P as w,x as _e,a as te,r,b as J,z as ht,H as ke,j as e,D as ae,q as se,t as oe,B as re,I as O,am as xt,an as mt,c as Ee,T as q,A as ne,ah as ft,ai as gt,a2 as jt,a0 as yt,U as Ae,V as Te,W as Me,Y as $e,Q as Y,N as ze,v as Ct,w as _,S as F,a9 as vt,o as U,p as W,s as ie,O as De,E as bt,R as kt,u as Dt,y as St,ac as wt,M as It,F as Le,C as ee,X as Rt,a5 as M,ao as _t,K as Et,L as At}from"./index-ChaGAcYI.js";import{D as Tt,I as Mt,A as $t}from"./AddDocStoreDialog-CZjr0j_d.js";import{B as zt}from"./BackdropLoader-Bk819Nkp.js";import{d as N}from"./documentstore-CAsbbKXX.js";import{O as Lt}from"./OutlinedInput-CAVpSyYT.js";import{I as Se}from"./TooltipWithParser-BlaLodP6.js";import{b as Vt,I as Ot}from"./IconSearch-BD2fMQi-.js";import{E as Nt}from"./ErrorBoundary-CHfNOSqb.js";import{S as we}from"./StyledButton-8-5Nm6DU.js";import{V as Bt}from"./ViewHeader-B6DddmIg.js";import{A as Ve,a as Oe,d as Ne,b as Be}from"./ExpandMore-DMM7gXG5.js";import{T as Pe}from"./Table-BsVIwlFv.js";import{n as Pt}from"./nodes-CUAgL10n.js";import{v as Ft}from"./v4-CtRu48qb.js";import{u as qt,C as Ut}from"./ConfirmDialog-UiX2DWMF.js";import{M as Wt,r as Ht,a as Gt,b as Jt,c as Yt,C as Kt}from"./CodeBlock-CD5vwQYW.js";import{d as Fe,a as Xt}from"./KeyboardArrowDown-DBACdo21.js";import{M as E,d as qe}from"./Delete-B3djbOl0.js";import{M as Qt}from"./Menu-CVBFicbZ.js";import{I as Zt}from"./IconRefresh-emIxLjaa.js";import{I as Ie,S as k}from"./IconPlus-DXcgeM4H.js";import"./CircularProgress-Cz104Ocn.js";import"./IconCopy-Si0QIoMO.js";import"./StyledFab-cwi8e6Ef.js";import"./IconArrowLeft-Db9vzZ6o.js";import"./Popover-DmQCuS9U.js";import"./toPropertyKey-BMrx9eIY.js";const Ue=({show:a,dialogProps:o,onCancel:x,onDocLoaderSelected:C})=>{const A=document.getElementById("portal"),f=_e(),h=te(),[d,l]=r.useState(""),[T,D]=r.useState([]),I=J(N.getDocumentLoaders),R=m=>{l(m)};function g(m){return m.name.toLowerCase().indexOf(d.toLowerCase())>-1}r.useEffect(()=>{o.documentLoaders&&D(o.documentLoaders)},[o]),r.useEffect(()=>{I.request()},[]),r.useEffect(()=>{I.data&&D(I.data)},[I.data]),r.useEffect(()=>(f(a?{type:ht}:{type:ke}),()=>f({type:ke})),[a,f]);const $=a?e.jsxs(ae,{fullWidth:!0,maxWidth:"md",open:a,onClose:x,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(se,{sx:{fontSize:"1rem",p:3,pb:0},id:"alert-dialog-title",children:o.title}),e.jsxs(oe,{sx:{display:"flex",flexDirection:"column",gap:2,maxHeight:"75vh",position:"relative",px:3,pb:3},children:[e.jsx(re,{sx:{backgroundColor:h.palette.background.paper,pt:2,position:"sticky",top:0,zIndex:10},children:e.jsx(Lt,{sx:{width:"100%",pr:2,pl:2,position:"sticky"},id:"input-search-credential",value:d,onChange:m=>R(m.target.value),placeholder:"Search",startAdornment:e.jsx(Se,{position:"start",children:e.jsx(Vt,{stroke:1.5,size:"1rem",color:h.palette.grey[500]})}),endAdornment:e.jsx(Se,{position:"end",sx:{cursor:"pointer",color:h.palette.grey[500],"&:hover":{color:h.palette.grey[900]}},title:"Clear Search",children:e.jsx(O,{stroke:1.5,size:"1rem",onClick:()=>R(""),style:{cursor:"pointer"}})}),"aria-describedby":"search-helper-text",inputProps:{"aria-label":"weight"}})}),e.jsx(xt,{sx:{width:"100%",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:2,py:0,zIndex:9,borderRadius:"10px",[h.breakpoints.down("md")]:{maxWidth:370}},children:[...T].filter(g).map(m=>e.jsxs(mt,{alignItems:"center",onClick:()=>C(m.name),sx:{border:1,borderColor:h.palette.grey[900]+25,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"start",textAlign:"left",gap:1,p:2},children:[e.jsx("div",{style:{width:50,height:50,borderRadius:"50%",backgroundColor:"white"},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:7,borderRadius:"50%",objectFit:"contain"},alt:m.name,src:`${Ee}/api/v1/node-icon/${m.name}`})}),e.jsx(q,{children:m.label})]},m.name))})]})]}):null;return ne.createPortal($,A)};Ue.propTypes={show:w.bool,dialogProps:w.object,onCancel:w.func,onDocLoaderSelected:w.func};const We=({show:a,dialogProps:o,onCancel:x,onDelete:C})=>{const A=document.getElementById("portal"),[f,h]=r.useState({}),[d,l]=r.useState(!1),[T,D]=r.useState([]),[I,R]=r.useState([]),g=J(Pt.getSpecificNode),$=t=>(n,c)=>{const j={...f};j[t]=c,h(j)};r.useEffect(()=>{if(o.recordManagerConfig){const t=o.recordManagerConfig.name;if(t&&g.request(t),o.vectorStoreConfig){const n=o.vectorStoreConfig.name;n&&g.request(n)}}return()=>{h({}),l(!1),D([]),R([])}},[o]),r.useEffect(()=>{if(g.data){const t=ft.cloneDeep(gt(g.data,Ft()));let n="vectorStoreConfig";t.category==="Record Manager"&&(n="recordManagerConfig");const c=[];for(const j in o[n].config){const u=t.inputParams.find(B=>B.name===j);if(!u||u.type==="credential")continue;let v={};const b=o[n].config[j];b&&(typeof b=="string"&&b.startsWith("{{")&&b.endsWith("}}")||(v={label:u==null?void 0:u.label,name:u==null?void 0:u.name,type:u==null?void 0:u.type,value:b},c.push(v)))}n==="vectorStoreConfig"?D([{label:t.label,name:t.name,category:t.category,id:t.id,paramValues:c}]):n==="recordManagerConfig"&&R([{label:t.label,name:t.name,category:t.category,id:t.id,paramValues:c}])}},[g.data]);const m=a?e.jsxs(ae,{fullWidth:!0,maxWidth:o.recordManagerConfig?"md":"sm",open:a,onClose:x,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(se,{sx:{fontSize:"1rem",p:3,pb:0},id:"alert-dialog-title",children:o.title}),e.jsxs(oe,{sx:{display:"flex",flexDirection:"column",gap:2,maxHeight:"75vh",position:"relative",px:3,pb:3},children:[e.jsx("span",{style:{marginTop:"20px"},children:o.description}),o.type==="STORE"&&o.recordManagerConfig&&e.jsx(jt,{control:e.jsx(yt,{checked:d,onChange:t=>l(t.target.checked)}),label:"Remove data from vector store"}),d&&e.jsxs("div",{children:[e.jsx(Ae,{component:Te,children:e.jsx(Me,{sx:{minWidth:650},"aria-label":"simple table",children:e.jsx($e,{children:e.jsx(Y,{sx:{"& td":{border:0}},children:e.jsx(ze,{sx:{pb:0,pt:0},colSpan:6,children:e.jsx(re,{children:[...T,...I].map((t,n)=>e.jsxs(Ve,{expanded:f[t.name]||!0,onChange:$(t.name),disableGutters:!0,children:[e.jsx(Oe,{expandIcon:e.jsx(Ne,{}),"aria-controls":`nodes-accordian-${t.name}`,id:`nodes-accordian-header-${t.name}`,children:e.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx("div",{style:{width:40,height:40,marginRight:10,borderRadius:"50%",backgroundColor:"white"},children:e.jsx("img",{style:{width:"100%",height:"100%",padding:7,borderRadius:"50%",objectFit:"contain"},alt:t.name,src:`${Ee}/api/v1/node-icon/${t.name}`})}),e.jsx(q,{variant:"h5",children:t.label})]})}),e.jsx(Be,{children:t.paramValues[0]&&e.jsx(Pe,{sx:{minWidth:150},rows:t.paramValues,columns:Object.keys(t.paramValues[0])})})]},n))})})})})})}),e.jsx("span",{style:{marginTop:"30px",fontStyle:"italic",color:"#b35702"},children:"* Only data that were upserted with Record Manager will be deleted from vector store"})]})]}),e.jsxs(Ct,{sx:{pr:3,pb:3},children:[e.jsx(_,{onClick:x,color:"primary",children:"Cancel"}),e.jsx(_,{variant:"contained",onClick:()=>C(o.type,o.file,d),color:"error",children:"Delete"})]})]}):null;return ne.createPortal(m,A)};We.propTypes={show:w.bool,dialogProps:w.object,onCancel:w.func,onDelete:w.func};const He=({show:a,dialogProps:o,onCancel:x})=>{const[C,A]=r.useState({}),[f,h]=r.useState(""),d=te(),[l,T]=r.useState({}),D=J(N.getDocumentStoreConfig),I=()=>`With the Upsert API, you can choose an existing document and reuse the same configuration for upserting.

\`\`\`python
import requests
import json

API_URL = "http://localhost:3000/api/v1/document-store/upsert/${o.storeId}"
API_KEY = "your_api_key_here"

# use form data to upload files
form_data = {
    "files": ('my-another-file.pdf', open('my-another-file.pdf', 'rb'))
}

body_data = {
    "docId": "${o.loaderId}",
    "metadata": {}, # Add additional metadata to the document chunks
    "replaceExisting": True, # Replace existing document with the new upserted chunks
    "splitter": json.dumps({"config":{"chunkSize":20000}}) # Override existing configuration
    # "loader": "",
    # "vectorStore": "",
    # "embedding": "",
    # "recordManager": "",
}

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}"
}

def query(form_data):
    response = requests.post(API_URL, files=form_data, data=body_data, headers=headers)
    print(response)
    return response.json()

output = query(form_data)
print(output)
\`\`\`

\`\`\`javascript
// use FormData to upload files
let formData = new FormData();
formData.append("files", input.files[0]);
formData.append("docId", "${o.loaderId}");
formData.append("splitter", JSON.stringify({"config":{"chunkSize":20000}}));
// Add additional metadata to the document chunks
formData.append("metadata", "{}");
// Replace existing document with the new upserted chunks
formData.append("replaceExisting", "true");
// Override existing configuration
// formData.append("loader", "");
// formData.append("embedding", "");
// formData.append("vectorStore", "");
// formData.append("recordManager", "");

async function query(formData) {
    const response = await fetch(
        "http://localhost:3000/api/v1/document-store/upsert/${o.storeId}",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer <your_api_key_here>"
            },
            body: formData
        }
    );
    const result = await response.json();
    return result;
}

query(formData).then((response) => {
    console.log(response);
});
\`\`\`

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/document-store/upsert/${o.storeId} \\
  -H "Authorization: Bearer <your_api_key_here>" \\
  -F "files=@<file-path>" \\
  -F "docId=${o.loaderId}" \\
  -F "splitter={"config":{"chunkSize":20000}}" \\
  -F "metadata={}" \\
  -F "replaceExisting=true" \\
  # Override existing configuration:
  # -F "loader=" \\
  # -F "embedding=" \\
  # -F "vectorStore=" \\
  # -F "recordManager="
\`\`\`
`,R=()=>`With the Upsert API, you can choose an existing document and reuse the same configuration for upserting.
 
\`\`\`python
import requests

API_URL = "http://localhost:3000/api/v1/document-store/upsert/${o.storeId}"
API_KEY = "your_api_key_here"

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}"
}

def query(payload):
    response = requests.post(API_URL, json=payload, headers=headers)
    return response.json()

output = query({
    "docId": "${o.loaderId}",
    "metadata": "{}", # Add additional metadata to the document chunks
    "replaceExisting": True, # Replace existing document with the new upserted chunks
    # Override existing configuration
    "loader": {
        "config": {
            "text": "This is a new text"
        }
    },
    "splitter": {
        "config": {
            "chunkSize": 20000
        }
    },
    # embedding: {},
    # vectorStore: {},
    # recordManager: {}
})
print(output)
\`\`\`

\`\`\`javascript
async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/document-store/upsert/${o.storeId}",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer <your_api_key_here>"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({
    "docId": "${o.loaderId},
    "metadata": "{}", // Add additional metadata to the document chunks
    "replaceExisting": true, // Replace existing document with the new upserted chunks
    // Override existing configuration
    "loader": {
        "config": {
            "text": "This is a new text"
        }
    },
    "splitter": {
        "config": {
            "chunkSize": 20000
        }
    },
    // embedding: {},
    // vectorStore: {},
    // recordManager: {}
}).then((response) => {
    console.log(response);
});
\`\`\`

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/document-store/upsert/${o.storeId} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <your_api_key_here>" \\
  -d '{
        "docId": "${o.loaderId}",
        "metadata": "{}",
        "replaceExisting": true,
        "loader": {
            "config": {
                "text": "This is a new text"
            }
        },
        "splitter": {
            "config": {
                "chunkSize": 20000
            }
        }
        // Override existing configuration
        // "embedding": {},
        // "vectorStore": {},
        // "recordManager": {}
      }'

\`\`\`
`,g=n=>{const c={},j=new Set;let u=!1;n.forEach(v=>{const{node:b,nodeId:B,label:H,name:L,type:K}=v;L==="files"&&(u=!0),j.add(b),c[b]||(c[b]={nodeIds:[],params:[]}),c[b].nodeIds.includes(B)||c[b].nodeIds.push(B);const P={label:H,name:L,type:K};c[b].params.some(G=>JSON.stringify(G)===JSON.stringify(P))||c[b].params.push(P)});for(const v in c)c[v].nodeIds.sort();A(c),h(u?I():R())},$=n=>(c,j)=>{const u={...l};u[n]=j,T(u)};r.useEffect(()=>{D.data&&g(D.data)},[D.data]),r.useEffect(()=>{a&&o&&D.request(o.storeId,o.loaderId)},[a,o]);const m=document.getElementById("portal"),t=a?e.jsxs(ae,{onClose:x,open:a,fullWidth:!0,maxWidth:"lg","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(se,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:o.title}),e.jsxs(oe,{children:[e.jsx(Wt,{remarkPlugins:[Ht,Gt],rehypePlugins:[Jt,Yt],components:{code({inline:n,className:c,children:j,...u}){const v=/language-(\w+)/.exec(c||"");return n?e.jsx("code",{className:c,...u,children:j}):e.jsx(Kt,{isDialog:!0,language:v&&v[1]||"",value:String(j).replace(/\n$/,""),...u})}},children:f}),e.jsx(q,{sx:{mt:3,mb:1},children:"You can override existing configurations:"}),e.jsx(F,{direction:"column",spacing:2,sx:{width:"100%",my:2},children:e.jsx(vt,{sx:{borderColor:d.palette.primary[200]+75,p:2},variant:"outlined",children:Object.keys(C).sort().map(n=>e.jsxs(Ve,{expanded:l[n]||!1,onChange:$(n),disableGutters:!0,children:[e.jsx(Oe,{expandIcon:e.jsx(Ne,{}),"aria-controls":`nodes-accordian-${n}`,id:`nodes-accordian-header-${n}`,children:e.jsxs(F,{flexDirection:"row",sx:{gap:2,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(q,{variant:"h5",children:n}),C[n].nodeIds.length>0&&C[n].nodeIds.map((c,j)=>e.jsx("div",{style:{display:"flex",flexDirection:"row",width:"max-content",borderRadius:15,background:"rgb(254,252,191)",padding:5,paddingLeft:10,paddingRight:10},children:e.jsx("span",{style:{color:"rgb(116,66,16)",fontSize:"0.825rem"},children:c})},j))]})}),e.jsx(Be,{children:e.jsx(Pe,{rows:C[n].params.map(c=>{const{node:j,nodeId:u,...v}=c;return v}),columns:Object.keys(C[n].params[0]).slice(-3)})})]},n))})})]})]}):null;return ne.createPortal(t,m)};He.propTypes={show:w.bool,dialogProps:w.object,onCancel:w.func};var le={},ea=W;Object.defineProperty(le,"__esModule",{value:!0});var de=le.default=void 0,ta=ea(U()),aa=e,sa=(0,ta.default)((0,aa.jsx)("path",{d:"M10 4h4v4h-4zM4 16h4v4H4zm0-6h4v4H4zm0-6h4v4H4zm10 8.42V10h-4v4h2.42zm6.88-1.13-1.17-1.17c-.16-.16-.42-.16-.58 0l-.88.88L20 12.75l.88-.88c.16-.16.16-.42 0-.58zM11 18.25V20h1.75l6.67-6.67-1.75-1.75zM16 4h4v4h-4z"}),"AppRegistration");de=le.default=sa;var ce={},oa=W;Object.defineProperty(ce,"__esModule",{value:!0});var ue=ce.default=void 0,ra=oa(U()),na=e,ia=(0,ra.default)((0,na.jsx)("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"}),"NoteAdd");ue=ce.default=ia;var pe={},la=W;Object.defineProperty(pe,"__esModule",{value:!0});var Ge=pe.default=void 0,da=la(U()),ca=e,ua=(0,da.default)((0,ca.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");Ge=pe.default=ua;var he={},pa=W;Object.defineProperty(he,"__esModule",{value:!0});var Je=he.default=void 0,ha=pa(U()),xa=e,ma=(0,ha.default)((0,xa.jsx)("path",{d:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"}),"Refresh");Je=he.default=ma;var xe={},fa=W;Object.defineProperty(xe,"__esModule",{value:!0});var Ye=xe.default=void 0,ga=fa(U()),ja=e,ya=(0,ga.default)((0,ja.jsx)("path",{d:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"}),"Code");Ye=xe.default=ya;const Ca="/assets/doc_store_details_empty-B8g8M--k.svg",i=ie(ze)(({theme:a})=>({borderColor:a.palette.grey[900]+25,padding:"6px 16px",[`&.${De.head}`]:{color:a.palette.grey[900]},[`&.${De.body}`]:{fontSize:14,height:64}})),Re=ie(Y)(()=>({"&:last-child td, &:last-child th":{border:0}})),Ke=ie(a=>e.jsx(Qt,{elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},...a}))(({theme:a})=>({"& .MuiPaper-root":{borderRadius:6,marginTop:a.spacing(1),minWidth:180,boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:a.palette.text.secondary,marginRight:a.spacing(1.5)},"&:active":{backgroundColor:bt(a.palette.primary.main,a.palette.action.selectedOpacity)}}}})),Ja=()=>{var ye,Ce,ve,be;const a=te(),o=kt(s=>s.customization),x=Dt(),C=_e();St();const{confirm:A}=qt(),f=(...s)=>C(Et(...s)),h=(...s)=>C(At(...s)),d=J(N.getSpecificDocumentStore),[l,T]=r.useState(null),[D,I]=r.useState(!0),[R,g]=r.useState(!1),[$,m]=r.useState(!1),[t,n]=r.useState({}),[c,j]=r.useState({}),[u,v]=r.useState(!1),[b,B]=r.useState({}),[H,L]=r.useState(!1),[K,P]=r.useState({}),[G,me]=r.useState(!1),[Qe,Ze]=r.useState({}),[fe,X]=r.useState(null),Q=!!fe,{storeId:z}=wt(),et=s=>{x("/document-stores/"+z+"/"+s)},ge=s=>{x("/document-stores/chunks/"+z+"/"+s)},tt=s=>{x("/document-stores/query/"+s)},at=s=>{v(!1),x("/document-stores/"+z+"/"+s)},st=s=>{x("/document-stores/vector/"+s)},je=()=>{B({title:"Select Document Loader"}),v(!0)},ot=async s=>{try{await N.deleteVectorStoreDataFromStore(s)}catch(y){console.error(y)}},rt=async(s,y,V)=>{if(g(!0),L(!1),s==="STORE"){V&&await ot(z);try{const p=await N.deleteDocumentStore(z);g(!1),p.data&&(f({message:"Store, Loader and associated document chunks deleted",options:{key:new Date().getTime()+Math.random(),variant:"success",action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}}),x("/document-stores/"))}catch(p){g(!1),T(p),f({message:`Failed to delete Document Store: ${typeof p.response.data=="object"?p.response.data.message:p.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}})}}else if(s==="LOADER")try{const p=await N.deleteLoaderFromStore(z,y.id);g(!1),p.data&&(f({message:"Loader and associated document chunks deleted",options:{key:new Date().getTime()+Math.random(),variant:"success",action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}}),Z())}catch(p){T(p),g(!1),f({message:`Failed to delete Document Loader: ${typeof p.response.data=="object"?p.response.data.message:p.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",persist:!0,action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}})}},nt=(s,y,V)=>{const p={title:"Delete",description:`Delete Loader ${s.loaderName} ? This will delete all the associated document chunks.`,vectorStoreConfig:y,recordManagerConfig:V,type:"LOADER",file:s};P(p),L(!0)},it=(s,y)=>{var p;const V={title:"Delete",description:`Delete Store ${(p=d.data)==null?void 0:p.name} ? This will delete all the associated loaders and document chunks.`,vectorStoreConfig:s,recordManagerConfig:y,type:"STORE"};P(V),L(!0)},lt=async s=>{if(await A({title:"Refresh all loaders and upsert all chunks?",description:"This will re-process all loaders and upsert all chunks. This action might take some time.",confirmButtonName:"Refresh",cancelButtonName:"Cancel"})){X(null),g(!0);try{(await N.refreshLoader(s)).data&&f({message:"Document store refresh successfully!",options:{key:new Date().getTime()+Math.random(),variant:"success",action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}}),g(!1)}catch(p){g(!1),f({message:`Failed to refresh document store: ${typeof p.response.data=="object"?p.response.data.message:p.response.data}`,options:{key:new Date().getTime()+Math.random(),variant:"error",action:S=>e.jsx(_,{style:{color:"white"},onClick:()=>h(S),children:e.jsx(O,{})})}})}}},dt=()=>{const y={title:"Edit Document Store",type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Update",data:{name:t.name,description:t.description,id:t.id}};j(y),m(!0)},Z=()=>{m(!1),d.request(z)},ct=s=>{s.preventDefault(),s.stopPropagation(),X(s.currentTarget)},ut=(s,y)=>{Ze({title:"Upsert API",storeId:s,loaderId:y}),me(!0)},pt=()=>{X(null)};return r.useEffect(()=>{d.request(z)},[]),r.useEffect(()=>{d.data&&n(d.data)},[d.data]),r.useEffect(()=>{d.error&&T(d.error)},[d.error]),r.useEffect(()=>{I(d.loading)},[d.loading]),e.jsxs(e.Fragment,{children:[e.jsx(It,{children:l?e.jsx(Nt,{error:l}):e.jsxs(F,{flexDirection:"column",sx:{gap:3},children:[e.jsxs(Bt,{isBackButton:!0,isEditButton:!0,search:!1,title:t==null?void 0:t.name,description:t==null?void 0:t.description,onBack:()=>x("/document-stores"),onEdit:()=>dt(),children:[((t==null?void 0:t.status)==="STALE"||(t==null?void 0:t.status)==="UPSERTING")&&e.jsx(Ot,{onClick:Z,size:"small",color:"primary",title:"Refresh Document Store",children:e.jsx(Zt,{})}),e.jsx(we,{variant:"contained",sx:{ml:2,minWidth:200,borderRadius:2,height:"100%",color:"white"},startIcon:e.jsx(Ie,{}),onClick:je,children:"Add Document Loader"}),e.jsx(_,{id:"document-store-header-action-button","aria-controls":Q?"document-store-header-menu":void 0,"aria-haspopup":"true","aria-expanded":Q?"true":void 0,variant:"outlined",disableElevation:!0,color:"secondary",onClick:ct,sx:{minWidth:150},endIcon:e.jsx(Fe,{}),children:"More Actions"}),e.jsxs(Ke,{id:"document-store-header-menu",MenuListProps:{"aria-labelledby":"document-store-header-menu-button"},anchorEl:fe,open:Q,onClose:pt,children:[e.jsxs(E,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)==="UPSERTING",onClick:()=>ge("all"),disableRipple:!0,children:[e.jsx(de,{}),"View & Edit Chunks"]}),e.jsxs(E,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)==="UPSERTING",onClick:()=>st(t.id),disableRipple:!0,children:[e.jsx(ue,{}),"Upsert All Chunks"]}),e.jsxs(E,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)!=="UPSERTED",onClick:()=>tt(t.id),disableRipple:!0,children:[e.jsx(Ge,{}),"Retrieval Query"]}),e.jsxs(E,{disabled:(t==null?void 0:t.totalChunks)<=0||(t==null?void 0:t.status)!=="UPSERTED",onClick:()=>lt(t.id),disableRipple:!0,title:"Re-process all loaders and upsert all chunks",children:[e.jsx(Je,{}),"Refresh"]}),e.jsx(Le,{sx:{my:.5}}),e.jsxs(E,{onClick:()=>it(t.vectorStoreConfig,t.recordManagerConfig),disableRipple:!0,children:[e.jsx(qe,{}),"Delete"]})]})]}),e.jsx(Tt,{status:t==null?void 0:t.status}),((Ce=(ye=d.data)==null?void 0:ye.whereUsed)==null?void 0:Ce.length)>0&&e.jsxs(F,{flexDirection:"row",sx:{gap:2,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{style:{paddingLeft:"15px",paddingRight:"15px",paddingTop:"10px",paddingBottom:"10px",fontSize:"0.9rem",width:"max-content",display:"flex",flexDirection:"row",alignItems:"center"},children:[e.jsx(Mt,{style:{marginRight:5},size:17}),"Chatflows Used:"]}),d.data.whereUsed.map((s,y)=>e.jsx(ee,{clickable:!0,style:{width:"max-content",borderRadius:"25px",boxShadow:o.isDarkMode?"0 2px 14px 0 rgb(255 255 255 / 10%)":"0 2px 14px 0 rgb(32 40 45 / 10%)"},label:s.name,onClick:()=>x("/canvas/"+s.id)},y))]}),!D&&t&&!((ve=t==null?void 0:t.loaders)!=null&&ve.length)?e.jsxs(F,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[e.jsx(re,{sx:{p:2,height:"auto"},children:e.jsx("img",{style:{objectFit:"cover",height:"16vh",width:"auto"},src:Ca,alt:"doc_store_details_emptySVG"})}),e.jsx("div",{children:"No Document Added Yet"}),e.jsx(we,{variant:"contained",sx:{borderRadius:2,height:"100%",mt:2,color:"white"},startIcon:e.jsx(Ie,{}),onClick:je,children:"Add Document Loader"})]}):e.jsx(Ae,{sx:{border:1,borderColor:a.palette.grey[900]+25,borderRadius:2},component:Te,children:e.jsxs(Me,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(Rt,{sx:{backgroundColor:o.isDarkMode?a.palette.common.black:a.palette.grey[100],height:56},children:e.jsxs(Y,{children:[e.jsx(i,{children:" "}),e.jsx(i,{children:"Loader"}),e.jsx(i,{children:"Splitter"}),e.jsx(i,{children:"Source(s)"}),e.jsx(i,{children:"Chunks"}),e.jsx(i,{children:"Chars"}),e.jsx(i,{children:"Actions"})]})}),e.jsx($e,{children:D?e.jsxs(e.Fragment,{children:[e.jsxs(Re,{children:[e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})})]}),e.jsxs(Re,{children:[e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})}),e.jsx(i,{children:e.jsx(k,{variant:"text"})})]})]}):e.jsx(e.Fragment,{children:(t==null?void 0:t.loaders)&&(t==null?void 0:t.loaders.length)>0&&(t==null?void 0:t.loaders.map((s,y)=>e.jsx(Xe,{index:y,loader:s,theme:a,onEditClick:()=>et(s.id),onViewChunksClick:()=>ge(s.id),onDeleteClick:()=>nt(s,t==null?void 0:t.vectorStoreConfig,t==null?void 0:t.recordManagerConfig),onChunkUpsert:()=>x(`/document-stores/vector/${t.id}/${s.id}`),onViewUpsertAPI:()=>ut(t.id,s.id)},y)))})})]})}),((be=d.data)==null?void 0:be.status)==="STALE"&&e.jsx("div",{style:{width:"100%",textAlign:"center",marginTop:"20px"},children:e.jsx(q,{color:"warning",style:{color:"darkred",fontWeight:500,fontStyle:"italic",fontSize:12},children:"Some files are pending processing. Please Refresh to get the latest status."})})]})}),$&&e.jsx($t,{dialogProps:c,show:$,onCancel:()=>m(!1),onConfirm:Z}),u&&e.jsx(Ue,{show:u,dialogProps:b,onCancel:()=>v(!1),onDocLoaderSelected:at}),H&&e.jsx(We,{show:H,dialogProps:K,onCancel:()=>L(!1),onDelete:rt}),G&&e.jsx(He,{show:G,dialogProps:Qe,onCancel:()=>me(!1)}),R&&e.jsx(zt,{open:R}),e.jsx(Ut,{})]})};function Xe(a){var d;const[o,x]=r.useState(null),C=!!o,A=l=>{l.preventDefault(),l.stopPropagation(),x(l.currentTarget)},f=()=>{x(null)},h=l=>l&&typeof l=="string"&&l.includes("base64")?_t(l):l&&typeof l=="string"&&l.startsWith("[")&&l.endsWith("]")?JSON.parse(l).join(", "):l;return e.jsx(e.Fragment,{children:e.jsxs(Y,{hover:!0,sx:{"&:last-child td, &:last-child th":{border:0},cursor:"pointer"},children:[e.jsx(i,{onClick:a.onViewChunksClick,scope:"row",style:{width:"5%"},children:e.jsx("div",{style:{display:"flex",width:"20px",height:"20px",backgroundColor:((d=a.loader)==null?void 0:d.status)==="SYNC"?"#00e676":"#ffe57f",borderRadius:"50%"}})}),e.jsx(i,{onClick:a.onViewChunksClick,scope:"row",children:a.loader.loaderName}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.splitterName??"None"}),e.jsx(i,{onClick:a.onViewChunksClick,children:h(a.loader.source)}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.totalChunks&&e.jsx(ee,{variant:"outlined",size:"small",label:a.loader.totalChunks.toLocaleString()})}),e.jsx(i,{onClick:a.onViewChunksClick,children:a.loader.totalChars&&e.jsx(ee,{variant:"outlined",size:"small",label:a.loader.totalChars.toLocaleString()})}),e.jsx(i,{children:e.jsxs("div",{children:[e.jsx(_,{id:"document-store-action-button","aria-controls":C?"document-store-action-customized-menu":void 0,"aria-haspopup":"true","aria-expanded":C?"true":void 0,disableElevation:!0,onClick:l=>A(l),endIcon:e.jsx(Fe,{}),children:"Options"}),e.jsxs(Ke,{id:"document-store-actions-customized-menu",MenuListProps:{"aria-labelledby":"document-store-actions-customized-button"},anchorEl:o,open:C,onClose:f,children:[e.jsxs(E,{onClick:a.onEditClick,disableRipple:!0,children:[e.jsx(Xt,{}),"Preview & Process"]}),e.jsxs(E,{onClick:a.onViewChunksClick,disableRipple:!0,children:[e.jsx(de,{}),"View & Edit Chunks"]}),e.jsxs(E,{onClick:a.onChunkUpsert,disableRipple:!0,children:[e.jsx(ue,{}),"Upsert Chunks"]}),e.jsxs(E,{onClick:a.onViewUpsertAPI,disableRipple:!0,children:[e.jsx(Ye,{}),"View API"]}),e.jsx(Le,{sx:{my:.5}}),e.jsxs(E,{onClick:a.onDeleteClick,disableRipple:!0,children:[e.jsx(qe,{}),"Delete"]})]})]})})]},a.index)})}Xe.propTypes={loader:M.any,index:M.number,open:M.bool,theme:M.any,onViewChunksClick:M.func,onEditClick:M.func,onDeleteClick:M.func,onChunkUpsert:M.func,onViewUpsertAPI:M.func};export{Ja as default};
