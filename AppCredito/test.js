import { mount,createLocalVue ,shallow } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify';

const localVue=createLocalVue();

localVue.use(Vuetify);
localVue.use(Vuex);
import GeneralStore from './ClientApp/app/store'
import Welcome from "./ClientApp/pages/welcome/welcome.vue"
import Correo from "./ClientApp/pages/correo/index"
import indexCambioDomicilio from "./ClientApp/pages/cambioDomicilio/index"
import bitCamDomCambioDomicilio from "./ClientApp/pages/cambioDomicilio/bitCamDom"
import asignarCambioDomicilio from "./ClientApp/pages/cambioDomicilio/asignar"
let token="kMguc0zf1h19KmbJQZRUufV_FdDvkgPvmc4QCJcMggVe84HWUtmyc_fb9IFVXmy0Y_sQuUcnVChT4d8O4XDanYqP7MNdWnZ7jasJPWMMmjiaXYE__PbzenaNleYOByEHoQWhs4YhtSpmsxC8";

describe("Bienvenida",()=>{
    const wrapper=mount(Welcome,{localVue});
    it("Contiene el mensaje de bienvenida correcto",()=>{
        expect(wrapper.html()).toContain('Bienvenido al módulo de Crédito')
    })    
})

describe("C.R.U.D Correo",()=>{    
    let actions
    let store  
    beforeEach(() => {
        actions = {                        
            getLogin: jest.fn(),
            getOrigin: jest.fn()
        }        
        GeneralStore.replaceState({
            user:{
                originURL:"",token:"",id:"",activo:"",
                empleado:"Usuario Pruebas",
                nombres:"",
                apellidos:"",
                aplicaciones:"",grupos:"",
                acciones:[{nombre:"Correo-Obtener"}],
            }
        });
    });
    
    
    it('formTitle',()=>{
        const wrapper=mount(Correo,{            
                mocks: {
                  $store: {
                    state: {
                        user:{
                            originURL:"",token:"",id:"",activo:"",
                            empleado:"Usuario Pruebas",
                            nombres:"",
                            apellidos:"",
                            aplicaciones:"",grupos:"",
                            acciones:[{nombre:"Correo-Obtener"}],
                        }
                    }
                  }
                }
            ,localVue});        
        wrapper.vm.editedIndex=-1
        expect(wrapper.vm.formTitle).toEqual("Agregar Correo");
    })
    it("Permiso Correcto",()=>{        
        const wrapper=mount(Correo,{mocks: {
            $store: {
              state: {
                  user:{
                      originURL:"",token:"",id:"",activo:"",
                      empleado:"Usuario Pruebas",
                      nombres:"",
                      apellidos:"",
                      aplicaciones:"",grupos:"",
                      acciones:[{nombre:"Correo-Obtener"}],
                  }
              }
            }
          },localVue});        
        expect(wrapper.vm.permisoCorreo).toBe(true)                  
    })

    

    it("Permiso Correcto",()=>{        
        const wrapper=shallow(Correo,{mocks: {
            $store: {
              state: {
                  user:{
                      originURL:"",token:"",id:"",activo:"",
                      empleado:"Usuario Pruebas",
                      nombres:"",
                      apellidos:"",
                      aplicaciones:"",grupos:"",
                      acciones:[{nombre:"Correo-Obtener"}],
                  }
              }
            }
          },localVue});        
        expect(wrapper.vm.permisoCorreo).toBe(true)                  
    })
    it("Permiso InCorrecto",()=>{        
        const wrapper=shallow(Correo,{mocks: {
            $store: {
              state: {
                  user:{
                      originURL:"",token:"",id:"",activo:"",
                      empleado:"Usuario Pruebas",
                      nombres:"",
                      apellidos:"",
                      aplicaciones:"",grupos:"",
                      acciones:[{nombre:"asdbkjasdhasd"}],
                  }
              }
            }
          },localVue});        
        expect(wrapper.vm.permisoCorreo).toBe(false)                  
    })
    it("Mostrar ventana de nuevo",()=>{        
        const wrapper=shallow(Correo,{mocks: {
        $store: {
            state: {
                user:{
                    originURL:"",token:"dT_FG96VJ3cL9tclV-RlhQZD_iqSaAt403sVRc-Wn8tFWN8PMgiT1-Okl_9PnOJ3Btz4-CG2o29HzeW7X8TPOUO_h2gOANtZgoZSklrU5xxqg-88_Xgigg1mXN0jC1RVeyowCk3v3N4JVz0KuD4e1WRE8o3E4LdSq4gZfiBN_-CCQ_b4sHOx9qR3tSf_a5h8rc03_hayIU3bW9D6f71aKZpB40YFUUkIjONXuQGRo5o",id:"",activo:"",
                    empleado:"Usuario Pruebas",
                    nombres:"",
                    apellidos:"",
                    aplicaciones:"",grupos:"",
                    acciones:[{nombre:"Correo-Obtener"}],
                }
            }
        }
        },localVue});        
        let item={correo:"correo"}
        let button=wrapper.find("button")
        console.log(wrapper.vm.dialog);
        button.trigger("click");       
        console.log(wrapper.vm.dialog); 
        expect(wrapper.vm.dialog).toBe(true)
    })
})

describe("Cambio de Domicilio",()=>{       
    

    it("tiene permiso de ",()=>{
        const wrapper=shallow(indexCambioDomicilio,{localVue,mocks: {
        $store: {
            state: {
                user:{
                    originURL:"",token,id:"",activo:"",
                    empleado:"Usuario Pruebas",
                    nombres:"",
                    apellidos:"",
                    aplicaciones:"",grupos:"",
                    acciones:[{nombre:"BitCamDom-Obtener"}],
                }
            }
        }}});
        expect(wrapper.html()).toContain("Bitacora Cambios");
    })
    it("tiene  permiso de asignación",()=>{
        const wrapper=shallow(indexCambioDomicilio,{localVue,mocks: {
        $store: {
            state: {
                user:{
                    originURL:"",token,id:"",activo:"",
                    empleado:"Usuario Pruebas",
                    nombres:"",
                    apellidos:"",
                    aplicaciones:"",grupos:"",
                    acciones:[{nombre:"Asignacion-Agregar"}],
                }
            }
        }}});        
        expect(wrapper.html()).toContain("Asignación");
    }) 
    it("No tiene permiso ",()=>{
        const wrapper=shallow(indexCambioDomicilio,{localVue,mocks: {
        $store: {
            state: {
               
            }
        }}});    
        expect(wrapper.html()).not.toContain("Bitacora Cambios")    
        expect(wrapper.html()).not.toContain("Asignación");
    })

    it("Pruebas Bitacora Cambio",()=>{
        const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.append(app);
        GeneralStore.replaceState({
            user:{
                originURL:"",token,id:"",activo:"",
                empleado:"Usuario Pruebas",
                nombres:"",
                apellidos:"",
                aplicaciones:"",grupos:"",
                acciones:[{nombre:"BitCamDom-Obtener"},{nombre:"Asignacion-Agregar"}],
            }
        });
        const wrapper=shallow(bitCamDomCambioDomicilio,{localVue,mocks: {
            $store: {
                state: {
                    user:{
                        originURL:"",token,id:"",activo:"",
                        empleado:"Usuario Pruebas",
                        nombres:"",
                        apellidos:"",
                        aplicaciones:"",grupos:"",
                        acciones:[{nombre:"BitCamDom-Obtener"},{nombre:"Asignacion-Agregar"}],
                    }
                }
            }}});
        
        expect(true).toBe(true)
        
    })
})
