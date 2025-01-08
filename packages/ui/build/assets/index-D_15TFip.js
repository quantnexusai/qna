import{r as s,e as Z,f as w,s as O,_ as v,E as oo,k as to,l as eo,j as t,a7 as ro,a8 as io,m as ao,i as u,n as no,N as so,O as S,Q as Y,P as F,a as J,R as lo,U as co,V as uo,W as po,X as go,Y as xo,T as U,w as Q,b as ho,M as mo,S as H,B as N,a4 as bo,g as _}from"./index-DnRqwzUl.js";import{I as vo}from"./ItemCard-ClxFzNPA.js";import{T as q,S as fo}from"./StyledButton-UqN_3QZz.js";import{T as jo,t as Co}from"./ToolDialog-CHaRIJhi.js";import{S as x,I as Bo}from"./IconPlus-t_dssfTo.js";import{V as To}from"./ViewHeader-9nMyGl0H.js";import{E as yo}from"./ErrorBoundary-Cg9p9QiY.js";import{T as Ro,I as $o,a as ko}from"./IconList-Cz1qIVLy.js";import"./Grid-88S9esAw.js";import"./DataGrid-CjSdxyq0.js";import"./Delete-TrOmempa.js";import"./OutlinedInput-BjbOs3SL.js";import"./TextField-CWFlncnn.js";import"./IconSearch-DuKTugus.js";import"./FormControl-CwX-cgG8.js";import"./Menu-CKXvTZgV.js";import"./Popover-Bg7ct0u8.js";import"./TooltipWithParser-RGTD2K7r.js";import"./CircularProgress-B03PZohM.js";import"./ConfirmDialog-BByP0sN1.js";import"./CodeEditor-Dz_1ga14.js";import"./ExportAsTemplateDialog-vEXodOiH.js";import"./IconTemplate-DPsYfI0A.js";import"./StyledFab-ByxVeh_y.js";import"./IconArrowLeft-DlsmOOmz.js";import"./IconCopy-r160ectE.js";function zo(e){return s.Children.toArray(e).filter(o=>s.isValidElement(o))}function Eo(e){return w("MuiButtonGroup",e)}const a=Z("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","vertical","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]),Po=["children","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"],Lo=(e,o)=>{const{ownerState:r}=e;return[{[`& .${a.grouped}`]:o.grouped},{[`& .${a.grouped}`]:o[`grouped${u(r.orientation)}`]},{[`& .${a.grouped}`]:o[`grouped${u(r.variant)}`]},{[`& .${a.grouped}`]:o[`grouped${u(r.variant)}${u(r.orientation)}`]},{[`& .${a.grouped}`]:o[`grouped${u(r.variant)}${u(r.color)}`]},{[`& .${a.firstButton}`]:o.firstButton},{[`& .${a.lastButton}`]:o.lastButton},{[`& .${a.middleButton}`]:o.middleButton},o.root,o[r.variant],r.disableElevation===!0&&o.disableElevation,r.fullWidth&&o.fullWidth,r.orientation==="vertical"&&o.vertical]},No=e=>{const{classes:o,color:r,disabled:p,disableElevation:h,fullWidth:n,orientation:g,variant:l}=e,f={root:["root",l,g==="vertical"&&"vertical",n&&"fullWidth",h&&"disableElevation"],grouped:["grouped",`grouped${u(g)}`,`grouped${u(l)}`,`grouped${u(l)}${u(g)}`,`grouped${u(l)}${u(r)}`,p&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return no(f,Eo,o)},Io=O("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:Lo})(({theme:e,ownerState:o})=>v({display:"inline-flex",borderRadius:(e.vars||e).shape.borderRadius},o.variant==="contained"&&{boxShadow:(e.vars||e).shadows[2]},o.disableElevation&&{boxShadow:"none"},o.fullWidth&&{width:"100%"},o.orientation==="vertical"&&{flexDirection:"column"},{[`& .${a.grouped}`]:v({minWidth:40,"&:hover":v({},o.variant==="contained"&&{boxShadow:"none"})},o.variant==="contained"&&{boxShadow:"none"}),[`& .${a.firstButton},& .${a.middleButton}`]:v({},o.orientation==="horizontal"&&{borderTopRightRadius:0,borderBottomRightRadius:0},o.orientation==="vertical"&&{borderBottomRightRadius:0,borderBottomLeftRadius:0},o.variant==="text"&&o.orientation==="horizontal"&&{borderRight:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${e.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${a.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}},o.variant==="text"&&o.orientation==="vertical"&&{borderBottom:e.vars?`1px solid rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${e.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${a.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}},o.variant==="text"&&o.color!=="inherit"&&{borderColor:e.vars?`rgba(${e.vars.palette[o.color].mainChannel} / 0.5)`:oo(e.palette[o.color].main,.5)},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"transparent"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"transparent"},o.variant==="contained"&&o.orientation==="horizontal"&&{borderRight:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${a.disabled}`]:{borderRight:`1px solid ${(e.vars||e).palette.action.disabled}`}},o.variant==="contained"&&o.orientation==="vertical"&&{borderBottom:`1px solid ${(e.vars||e).palette.grey[400]}`,[`&.${a.disabled}`]:{borderBottom:`1px solid ${(e.vars||e).palette.action.disabled}`}},o.variant==="contained"&&o.color!=="inherit"&&{borderColor:(e.vars||e).palette[o.color].dark},{"&:hover":v({},o.variant==="outlined"&&o.orientation==="horizontal"&&{borderRightColor:"currentColor"},o.variant==="outlined"&&o.orientation==="vertical"&&{borderBottomColor:"currentColor"})}),[`& .${a.lastButton},& .${a.middleButton}`]:v({},o.orientation==="horizontal"&&{borderTopLeftRadius:0,borderBottomLeftRadius:0},o.orientation==="vertical"&&{borderTopRightRadius:0,borderTopLeftRadius:0},o.variant==="outlined"&&o.orientation==="horizontal"&&{marginLeft:-1},o.variant==="outlined"&&o.orientation==="vertical"&&{marginTop:-1})})),Do=s.forwardRef(function(o,r){const p=to({props:o,name:"MuiButtonGroup"}),{children:h,className:n,color:g="primary",component:l="div",disabled:f=!1,disableElevation:j=!1,disableFocusRipple:C=!1,disableRipple:y=!1,fullWidth:T=!1,orientation:I="horizontal",size:R="medium",variant:$="outlined"}=p,D=eo(p,Po),k=v({},p,{color:g,component:l,disabled:f,disableElevation:j,disableFocusRipple:C,disableRipple:y,fullWidth:T,orientation:I,size:R,variant:$}),m=No(k),E=s.useMemo(()=>({className:m.grouped,color:g,disabled:f,disableElevation:j,disableFocusRipple:C,disableRipple:y,fullWidth:T,size:R,variant:$}),[g,f,j,C,y,T,R,$,m.grouped]),P=zo(h),G=P.length,W=B=>{const b=B===0,z=B===G-1;return b&&z?"":b?m.firstButton:z?m.lastButton:m.middleButton};return t.jsx(Io,v({as:l,role:"group",className:ao(m.root,n),ref:r,ownerState:k},D,{children:t.jsx(ro.Provider,{value:E,children:P.map((B,b)=>t.jsx(io.Provider,{value:W(b),children:B},b))})}))}),Go=Do,Wo="/assets/tools_empty-ini-pB8C.svg",c=O(so)(({theme:e})=>({borderColor:e.palette.grey[900]+25,[`&.${S.head}`]:{color:e.palette.grey[900]},[`&.${S.body}`]:{fontSize:14,height:64}})),A=O(Y)(()=>({"&:last-child td, &:last-child th":{border:0}})),X=({data:e,isLoading:o,onSelect:r})=>{const p=J(),h=lo(n=>n.customization);return t.jsx(t.Fragment,{children:t.jsx(co,{sx:{border:1,borderColor:p.palette.grey[900]+25,borderRadius:2},component:uo,children:t.jsxs(po,{sx:{minWidth:650},size:"small","aria-label":"a dense table",children:[t.jsx(go,{sx:{backgroundColor:h.isDarkMode?p.palette.common.black:p.palette.grey[100],height:56},children:t.jsxs(Y,{children:[t.jsx(c,{component:"th",scope:"row",children:"Name"},"0"),t.jsx(c,{children:"Description"},"1"),t.jsx(c,{component:"th",scope:"row",children:" "},"3")]})}),t.jsx(xo,{children:o?t.jsxs(t.Fragment,{children:[t.jsxs(A,{children:[t.jsx(c,{children:t.jsx(x,{variant:"text"})}),t.jsx(c,{children:t.jsx(x,{variant:"text"})}),t.jsx(c,{children:t.jsx(x,{variant:"text"})})]}),t.jsxs(A,{children:[t.jsx(c,{children:t.jsx(x,{variant:"text"})}),t.jsx(c,{children:t.jsx(x,{variant:"text"})}),t.jsx(c,{children:t.jsx(x,{variant:"text"})})]})]}):t.jsx(t.Fragment,{children:e==null?void 0:e.map((n,g)=>t.jsxs(A,{children:[t.jsxs(c,{sx:{display:"flex",alignItems:"center",gap:1},children:[t.jsx("div",{style:{width:35,height:35,display:"flex",flexShrink:0,marginRight:10,borderRadius:"50%",backgroundImage:`url(${n.iconSrc})`,backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}}),t.jsx(U,{sx:{display:"-webkit-box",fontSize:14,fontWeight:500,WebkitLineClamp:2,WebkitBoxOrient:"vertical",textOverflow:"ellipsis",overflow:"hidden"},children:t.jsx(Q,{onClick:()=>r(n),sx:{textAlign:"left"},children:n.templateName||n.name})})]},"0"),t.jsx(c,{children:t.jsx(U,{sx:{overflowWrap:"break-word",whiteSpace:"pre-line"},children:n.description||""})},"1"),t.jsx(c,{},"3")]},g))})})]})})})};X.propTypes={data:F.array,isLoading:F.bool,onSelect:F.func};const dt=()=>{var B,b,z;const e=J(),o=ho(Co.getAllTools),[r,p]=s.useState(!0),[h,n]=s.useState(null),[g,l]=s.useState(!1),[f,j]=s.useState({}),[C,y]=s.useState(localStorage.getItem("toolsDisplayStyle")||"card"),T=s.useRef(null),I=(i,d)=>{d!==null&&(localStorage.setItem("toolsDisplayStyle",d),y(d))},R=i=>{try{const d={title:"Add New Tool",type:"IMPORT",cancelButtonName:"Cancel",confirmButtonName:"Save",data:JSON.parse(i)};j(d),l(!0)}catch(d){console.error(d)}},$=i=>{if(!i.target.files)return;const d=i.target.files[0],V=new FileReader;V.onload=L=>{var M;if(!((M=L==null?void 0:L.target)!=null&&M.result))return;const{result:K}=L.target;R(K)},V.readAsText(d)},D=()=>{j({title:"Add New Tool",type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add"}),l(!0)},k=i=>{j({title:"Edit Tool",type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Save",data:i}),l(!0)},m=()=>{l(!1),o.request()},[E,P]=s.useState(""),G=i=>{P(i.target.value)};function W(i){return i.name.toLowerCase().indexOf(E.toLowerCase())>-1||i.description.toLowerCase().indexOf(E.toLowerCase())>-1}return s.useEffect(()=>{o.request()},[]),s.useEffect(()=>{p(o.loading)},[o.loading]),s.useEffect(()=>{o.error&&n(o.error)},[o.error]),t.jsxs(t.Fragment,{children:[t.jsx(mo,{children:h?t.jsx(yo,{error:h}):t.jsxs(H,{flexDirection:"column",sx:{gap:3},children:[t.jsxs(To,{onSearchChange:G,search:!0,searchPlaceholder:"Search Tools",title:"Tools",children:[t.jsxs(Ro,{sx:{borderRadius:2,maxHeight:40},value:C,color:"primary",exclusive:!0,onChange:I,children:[t.jsx(q,{sx:{borderColor:e.palette.grey[900]+25,borderRadius:2,color:(B=e==null?void 0:e.customization)!=null&&B.isDarkMode?"white":"inherit"},variant:"contained",value:"card",title:"Card View",children:t.jsx($o,{})}),t.jsx(q,{sx:{borderColor:e.palette.grey[900]+25,borderRadius:2,color:(b=e==null?void 0:e.customization)!=null&&b.isDarkMode?"white":"inherit"},variant:"contained",value:"list",title:"List View",children:t.jsx(ko,{})})]}),t.jsxs(N,{sx:{display:"flex",alignItems:"center"},children:[t.jsx(Q,{variant:"outlined",onClick:()=>T.current.click(),startIcon:t.jsx(bo,{}),sx:{borderRadius:2,height:40},children:"Load"}),t.jsx("input",{style:{display:"none"},ref:T,type:"file",hidden:!0,accept:".json",onChange:i=>$(i)})]}),t.jsx(Go,{disableElevation:!0,"aria-label":"outlined primary button group",children:t.jsx(fo,{variant:"contained",onClick:D,startIcon:t.jsx(Bo,{}),sx:{borderRadius:2,height:40},children:"Create"})})]}),!C||C==="card"?t.jsx(t.Fragment,{children:r?t.jsxs(N,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:_,children:[t.jsx(x,{variant:"rounded",height:160}),t.jsx(x,{variant:"rounded",height:160}),t.jsx(x,{variant:"rounded",height:160})]}):t.jsx(N,{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:_,children:o.data&&((z=o.data)==null?void 0:z.filter(W).map((i,d)=>t.jsx(vo,{data:i,onClick:()=>k(i)},d)))})}):t.jsx(X,{data:o.data,isLoading:r,onSelect:k}),!r&&(!o.data||o.data.length===0)&&t.jsxs(H,{sx:{alignItems:"center",justifyContent:"center"},flexDirection:"column",children:[t.jsx(N,{sx:{p:2,height:"auto"},children:t.jsx("img",{style:{objectFit:"cover",height:"20vh",width:"auto"},src:Wo,alt:"ToolEmptySVG"})}),t.jsx("div",{children:"No Tools Created Yet"})]})]})}),t.jsx(jo,{show:g,dialogProps:f,onCancel:()=>l(!1),onConfirm:m,setError:n})]})};export{dt as default};