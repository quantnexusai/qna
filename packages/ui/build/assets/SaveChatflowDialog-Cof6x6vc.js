import{P as o,r as s,j as e,D as p,q as x,t as h,v as y,w as g,A as j}from"./index-YrBb95ol.js";import{S}from"./StyledButton-DXZyQiwo.js";import{O as b}from"./OutlinedInput-BhZIIZoj.js";const v=({show:n,dialogProps:l,onCancel:r,onConfirm:i})=>{const u=document.getElementById("portal"),[t,m]=s.useState(""),[c,d]=s.useState(!1);s.useEffect(()=>{d(!!t)},[t]);const f=n?e.jsxs(p,{open:n,fullWidth:!0,maxWidth:"xs",onClose:r,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",disableRestoreFocus:!0,children:[e.jsx(x,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:l.title}),e.jsx(h,{children:e.jsx(b,{autoFocus:!0,sx:{mt:1},id:"chatflow-name",type:"text",fullWidth:!0,placeholder:"My New Chatflow",value:t,onChange:a=>m(a.target.value),onKeyDown:a=>{c&&a.key==="Enter"&&i(a.target.value)}})}),e.jsxs(y,{children:[e.jsx(g,{onClick:r,children:l.cancelButtonName}),e.jsx(S,{disabled:!c,variant:"contained",onClick:()=>i(t),children:l.confirmButtonName})]})]}):null;return j.createPortal(f,u)};v.propTypes={show:o.bool,dialogProps:o.object,onCancel:o.func,onConfirm:o.func};export{v as S};