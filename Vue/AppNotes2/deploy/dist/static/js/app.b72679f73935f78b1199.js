webpackJsonp([3],{"7zck":function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("7+uW"),n=o("NziG"),r={firebase:{notas:{source:n.a.ref("notas"),cancelCallback:function(t){console.error(t)}}},data:function(){return{nuevaNota:{titulo:"",descripcion:"",color_fondo:null},colores:[{text:"Rojo",value:"red"},{text:"Negro",value:"black"},{text:"Amarillo",value:"yellow"},{text:"Naranja",value:"orange"},{text:"Verde",value:"green"},{text:"Cafe",value:"brown"},{text:"Gris",value:"gray"}],dialog:!1,clipped:!0,drawer:!0,object:{},fixed:!1,menuItems:[{title:"Home",path:"/",icon:"home"},{title:"Notas",path:"/notas",icon:"note"}],items:[{icon:"bubble_chart",title:"Inspire"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"AppNotas"}},computed:{appTitle:function(){return this.$store.state.appTitle}},methods:{agregarNota:function(){var t=n.a.ref("notas").push().key,e={titulo:this.nuevaNota.titulo,descripcion:this.nuevaNota.descripcion,color_fondo:this.nuevaNota.color_fondo};n.a.ref("notas/"+t+"/").set(e),this.dialog=!1,this.nuevaNota.titulo="",this.nuevaNota.descripcion="",this.nuevaNota.color_fondo=null}},name:"App"},i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:t.clipped,"enable-resize-watcher":"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[o("v-list",t._l(t.menuItems,function(e){return o("v-list-tile",{key:e.title,attrs:{to:e.path}},[o("v-list-tile-action",[o("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),o("v-list-tile-content",[t._v(t._s(e.title))])],1)}))],1),t._v(" "),o("v-toolbar",{attrs:{app:"","clipped-left":t.clipped}},[o("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),o("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),o("v-spacer"),t._v(" "),o("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[o("v-icon",[t._v("note_add")])],1)],1),t._v(" "),o("v-content",[o("router-view")],1),t._v(" "),o("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-form",{staticClass:"form-inline",attrs:{id:"form"},on:{submit:function(e){return e.preventDefault(),t.agregarNota(e)}}},[o("v-card",[o("v-card-text",[o("v-text-field",{staticClass:"form-control",attrs:{id:"titulo",label:"Titulo",required:""},model:{value:t.nuevaNota.titulo,callback:function(e){t.$set(t.nuevaNota,"titulo",e)},expression:"nuevaNota.titulo"}}),t._v(" "),o("v-text-field",{attrs:{id:"descripcion",label:"Descripcion","multi-line":"",required:""},model:{value:t.nuevaNota.descripcion,callback:function(e){t.$set(t.nuevaNota,"descripcion",e)},expression:"nuevaNota.descripcion"}}),t._v(" "),o("v-select",{staticClass:"input-group--focused",attrs:{items:t.colores,label:"Select","item-value":"value",required:""},model:{value:t.nuevaNota.color_fondo,callback:function(e){t.$set(t.nuevaNota,"color_fondo",e)},expression:"nuevaNota.color_fondo"}})],1),t._v(" "),o("v-card-actions",[o("v-btn",{attrs:{color:"primary",flat:"",type:"submit"}},[t._v("Guardar")]),t._v(" "),o("v-btn",{attrs:{color:"error",flat:""},on:{click:function(e){e.stopPropagation(),t.dialog=!1}}},[t._v("Cerrar")])],1)],1)],1)],1),t._v(" "),o("v-footer",{attrs:{fixed:t.fixed,app:""}},[o("span",[t._v("© 2017")])])],1)},staticRenderFns:[]},l=o("VU/8")(r,i,!1,null,null,null).exports,s=o("Dd8w"),c=o.n(s),u=o("/ocq");a.a.use(u.a);var p=[{path:"/",component:"HelloWorld"},{path:"/notas",component:"Notas"}].map(function(t){return c()({},t,{component:function(){return o("mUJ2")("./"+t.component+".vue")}})}),d=new u.a({mode:"history",routes:p}),v=o("3EgV"),f=o.n(v),m=(o("7zck"),o("NYxO"));a.a.use(m.a);var b=new m.a.Store({state:{},mutations:{},actions:{},getters:{}}),_=o("1mcD"),g=o.n(_);a.a.use(g.a),a.a.use(f.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:d,store:b,render:function(t){return t(l)}})},NziG:function(t,e,o){"use strict";o.d(e,"a",function(){return n});var a=o("Sazm"),n=o.n(a).a.initializeApp({apiKey:"AIzaSyDYrZsLbAVUJRORgML8BdVStkyHJu_p1ak",authDomain:"appnote-4b46d.firebaseapp.com",databaseURL:"https://appnote-4b46d.firebaseio.com",projectId:"appnote-4b46d",storageBucket:"appnote-4b46d.appspot.com",messagingSenderId:"407642277299"}).database()},mUJ2:function(t,e,o){var a={"./HelloWorld.vue":["gORT",0],"./Notas.vue":["ig4/",1]};function n(t){var e=a[t];return e?o.e(e[1]).then(function(){return o(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}n.keys=function(){return Object.keys(a)},n.id="mUJ2",t.exports=n}},["NHnr"]);
//# sourceMappingURL=app.b72679f73935f78b1199.js.map