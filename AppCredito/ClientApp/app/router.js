import VueRouter   from 'vue-router'
import welcome from '../pages/welcome/welcome.vue'
import cambioDomicilio  from '../pages/cambioDomicilio/index.vue'
import supervision  from '../pages/supervision/index.vue'
import emails from '../pages/correo/index.vue'
import store from './store';
 
const routes=[
    { path: '/emails', component: emails },
    { path: '/supervision', component: supervision },
    { path: '/cambioDomicilio', component: cambioDomicilio },
    { path: '/home'},
    { path: '/logout'},    
    { path: '*', component: welcome },    
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {  
        
    if(to.fullPath=="/home" ||to.fullPath=="/logout")
    {
        store.dispatch('getOrigin').then(res=>{                            
            
            window.location=res.data.completeURLAPP+"/#"+to.fullPath
        }).catch(error=>{
            commit("setUserSession",null);
        });
    }
    else{
        store.dispatch("getLogin")
        .then(res=>{            
            try {
                store.commit("setUserSession",res.data);    
            } 
            catch (error) {
                console.log(error)
            }
            finally{
                next();
            }            
        }).catch(error=>{
            
            store.commit("setUserSession",null);
            store.dispatch('getOrigin').then(res=>{                            
                
                console.log("Redireccion")
                window.location=res.data.completeURLAPP+"/#"+to.fullPath
            }).catch(error=>{
                console.log(error)
                commit("setUserSession",null);
            });
        });
    }           
});
export default router