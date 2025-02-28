import{r as c}from"./app-DxWiE8Ot.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),m=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=c.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:s="",children:n,iconNode:a,...f},l)=>c.createElement("svg",{ref:l,...w,width:t,height:t,stroke:e,strokeWidth:r?Number(o)*24/Number(t):o,className:m("lucide",s),...f},[...a.map(([u,i])=>c.createElement(u,i)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=(e,t)=>{const o=c.forwardRef(({className:r,...s},n)=>c.createElement(b,{ref:n,iconNode:t,className:m(`lucide-${h(e)}`,r),...s}));return o.displayName=`${e}`,o};function g(e,t,{checkForDefaultPrevented:o=!0}={}){return function(s){if(e==null||e(s),o===!1||!s.defaultPrevented)return t==null?void 0:t(s)}}function C(e){const t=c.useRef(e);return c.useEffect(()=>{t.current=e}),c.useMemo(()=>(...o)=>{var r;return(r=t.current)==null?void 0:r.call(t,...o)},[])}function y({prop:e,defaultProp:t,onChange:o=()=>{}}){const[r,s]=p({defaultProp:t,onChange:o}),n=e!==void 0,a=n?e:r,f=C(o),l=c.useCallback(u=>{if(n){const d=typeof u=="function"?u(e):u;d!==e&&f(d)}else s(u)},[n,e,s,f]);return[a,l]}function p({defaultProp:e,onChange:t}){const o=c.useState(e),[r]=o,s=c.useRef(r),n=C(t);return c.useEffect(()=>{s.current!==r&&(n(r),s.current=r)},[r,s,n]),o}export{g as a,y as b,R as c,C as u};
