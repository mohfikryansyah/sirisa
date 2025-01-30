import{r as u}from"./app-Dg2GnLf7.js";import{u as a}from"./button-BtY4gxEV.js";import{b as h}from"./index-CJydatsJ.js";function g(r){const[d,e]=u.useState(void 0);return a(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const f=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const c=o[0];let i,t;if("borderBoxSize"in c){const s=c.borderBoxSize,n=Array.isArray(s)?s[0]:s;i=n.inlineSize,t=n.blockSize}else i=r.offsetWidth,t=r.offsetHeight;e({width:i,height:t})});return f.observe(r,{box:"border-box"}),()=>f.unobserve(r)}else e(void 0)},[r]),d}/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],p=h("Check",b);export{p as C,g as u};
