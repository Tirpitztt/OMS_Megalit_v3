import * as axios from 'axios'


const instance = axios.create({

})

export const ordersAPI = {
    getOnlyCustomers(){
        return instance.get('/customer/getOnlyCustomers').then(
            response=>{
                return response.data
            }
        )
    },
    getCustomerById(id){
        return instance.get('/customer/getCustomerById/'+id).then(
            response=>{
                return response.data
            }
        )
    },
    getOrders(){
        return instance.get('/customer/getAll').then(
            response=>{
                return response.data
            }
        )
    },
    getAllOrders(body){
        return instance.post('/order/getAllOrders',body).then(
            response=>{
                return response.data
            }
        )
    },
    getOrder(id){
      return instance.get('/order/get_order/'+ id).then(
          response=>{
              return response.data
          }
      )
    },
    editOrder(id){
        return instance.get('/order/editOrder/'+id).then(
            response=>{
                return response.data
            }
        )
    },
    orderCreate(body){
        return instance.post('/order/newOrder',body).then(
            response=>{
                return response
            }
        ).catch(err=>{
            if(err.response){
                return {status:'NOK'}
            }
            return err;
        })
    },
    updateOrder(body){
        return instance.post('/order/updateOrder',body).then(
            response=>{
                return response
            }
        )
    },
    deleteOrder(body){
        return instance.post('/order/delOrder',body).then(
            response=>{
                return response.data
            }
        ).catch(err=>{
            if(err.response){
                return {status:'HUI'}
            }
            return err
        })
    },
    addComplect(body){
        return instance.post('/order/addComplect',body).then(
            response=>{
                return response.data
            }
        )
    },
    addHandling(body){
        return instance.post('/order/addHandlings',body).then(
            response=>{
                return response.data
            }
            )
    },
    addMontaz(body){
        return instance.post('/order/addMontaz',body).then(
            response=>{
                return response.data
            }
        )
    },
    editMontaz(body){
        return instance.post('/order/editMontaz',body).then(
            response=>{
                return response.data
            }
        )
    },
    editTextGrav(body){
        return instance.post('/order/editTextGrav',body).then(
            response=>{
                return response.data
            }
        )
    },
    editSketchPath(body){
        return instance.post('/order/editSketchPath',body).then(
            response=>{
                return response.data
            }
        )
    },
    editNotice(body){
        return instance.post('/order/editNotice',body).then(
            response=>{
                return response.data
            }
        )
    },
    editStatus(body){
        return instance.post('/order/editStatus',body).then(
            response=>{
                return response.data
            }
        )
    },
    editTermin(body){
        return instance.post('/order/editTermin',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteComplect(body){
        return instance.post('/order/deleteComplect',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteDetail(body){
        return instance.post('/order/deleteDetail',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteHandling(body){
        return instance.post('/order/deleteHandling',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteMontaz(body){
        return instance.post('/order/deleteMontaz',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteSketch(body){
        return instance.post('/order/deleteSketchByID',body).then(
            response=>{
                return response.data
            }
        )
    },
    getEditable(body){
        return instance.post('/order/getEditable',body).then(
            response=>{
                return response.data
            }
        )
    },
    addEditHistory(body){
        return instance.post('/order/addHistory',body).then(
            response=>{
                return response.data
            }
        )
    }
}
export const createOrderAPI={
    createComplect(body){
        return instance.post('/order/create_complect',body).then(
            response=>{
                return response.data
            }
        )
    }
}
export const calculationAPI={
    priceCreate(detail){
        return instance.post('/calc/price_create',detail).then(
            response=>{
                return response.data
            }
        )
    },
    createCalculation(orderId){
        return instance.get('/calc/createCalc/'+orderId).then(
            response=>{
                return response.data
            }
        )
    },
    createTotalCost(body){
        return instance.post('/calc/create_cost',body).then(
            response=>{
                return response.data
            }
        )
    },
    setPayment(body){
        return instance.post('/calc/set-payment',body).then(
            response=>{
                return response.data
            }
        )
    },
    totalCostUpdate(body){
        return instance.post('/calc/total-cost-upd',body).then(
            response=>{
                return response.data
            }
        )
    }
}
export const supportAPI={
    getMaterial(){
        return instance.get('/support/getMaterial').then(
            response=>{
                return response.data
            }
        )
    },
    getMaterials(){
        return instance.get('/support/getMaterials').then(
            response=>{
                return response.data
            }
        )
    },

    addMaterial(body){
        return instance.post('/support/addMaterial',body).then(
            response=>{
                return response.data
            }
        )
    },
    updateMaterial(body){
        return instance.post('/support/updateMaterial',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteMaterial(body){
        return instance.post('/support/deleteMaterial',body).then(
            response=>{
                return response.data
            }
        )
    },
    getRates(){
        return instance.get('/support/getRates').then(
            response=>{
                return response.data
            }
        )
    },
    addRates(body){
        return instance.post('/support/addRates',body).then(
            response=>{
                return response.data
            }
        )
    },
    updateRates(body){
        return instance.post('/support/updateRates',body).then(
            response=>{
                return response.data
            }
        )
    },
    getContures(){
        return instance.get('/support/contures').then(
                response=>{
                    return response.data
                })
    },
    getConturesEntry(body){
        return instance.post('/support/contures',body).then(
            response=>{
                return response.data
            })
    },
    getAvatars(){
        return instance.post('/support/avatars').then(
            response=>{
                return response.data
            }
        )
    },
    getWorkOperations(){
        return instance.get('/support/getWorkOperations').then(
            response=>{
                return response.data
            }
        )
    },
    getWorkOperation(body){
        return instance.post('/support/getWorkOperation',body).then(
            response=>{
                return response.data
            }
        )
    },
    addWorkOperation(body){
        return instance.post('/support/addWorkOperation',body).then(
            response=>{
                return response.data
            }
        )
    },
    updateWorkOperation(body){
        return instance.post('/support/updateWorkOperation',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteWorkOperation(body){
        return instance.post('/support/deleteWorkOperation',body).then(
            response=>{
                return response.data
            }
        )
    },
    addGds(body){
        return instance.post('/support/addGds',body).then(
            response=>{
                return response.data
            }
        )
    },
    editGds(body){
        return instance.post('/support/editGds',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteGds(body){
        return instance.post('/support/deleteGds',body).then(
            response=>{
                return response.data
            }
        )
    },
    getStandartKit(body){
        return instance.post('/support/getStandartKit',body).then(
            response=>{
                return response.data
            }
        )
    }
}
export const usersAPI = {
    registrationUser(body){
        return instance.post('/auth/registration',body).then(
            response=>{
                return response.data
            }
        )
    },
    getAllUsers(){
        return instance.get('/auth/allUsers').then(
            response=>{
                return response.data
            }
        )
    },
    getUserOfId(body){
        return instance.post('/auth/getUser',body).then(
            response=>{
                return response.data
            }
        )
    }
}

export const betonAPI = {
    getBetonState(){
        return instance.get('/beton/getBetonState').then(
            response=>{
                return response.data
            }
        )
    },
    addBetonMix(body){
      return instance.post('/beton/addBetonMix',body).then(
          response=>{
              return response.data
          }
      )
    },
    updateBetonMix(body){
        return instance.post('/beton/updateBetonMix',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteIngredient(body){
        return instance.post('/beton/deleteIngredient',body).then(
            response=>{
                return response.data
            }
        )
    },
    getBetonDetails(){
      return instance.get('/beton/getBetonDetailsAll').then(
          response=>{
              return response.data
          }
      )
    },
    addBetonDetail(body){
        return instance.post('/beton/addBetonDetail',body).then(
            response=>{
                return response.data
            }
        )
    },
    updateBetonDetail(body){
        return instance.post('/beton/updateBetonDetail',body).then(
            response=>{
                return response.data
            }
        )
    }

}
export const mainAPI = {
    getMainState(){
        return instance.get('/main/getMainState').then(
            response=>{
                return response.data
            }
        )
    },
    getCalcState(){
        return instance.post('/main/getCalcState').then(
            response=>{
                return response.data
            }
        )
    },
    getCalcOfDate(body){
        return instance.post('/main/getCalcOfDate',body).then(
            response=>{
                return response.data
            }
        )
    },
    getArticle(body){
        return instance.post('/main/getArticleOne',body).then(
            response=>{
                return response.data
            }
        )
    },
    addArticle(body){
        return instance.post('/main/addArticle',body).then(
            response=>{
                return response.data
            }
        )
    },
    editArticle(body){
        return instance.post('/main/editArticle',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteArticle(body){
        return instance.post('/main/deleteArticle',body).then(
            response=>{
                return response.data
            }
        )
    },
    deleteComment(body){
        return instance.post('/main/deleteComment',body).then(
            response=>{
                return response.data
            }
        )
    },
    addComment(body){
        return instance.post('/main/addComment',body).then(
            response=>{
                return response.data
            }
        )
    },
    addFile(body){
        return instance.post('/main/addFile',body).then(
            response=>{
                return response.data
            }
        )
    },
}
export const stoneAPI = {
    addStone(body){
        return instance.post('/stone/addStone',body).then(
            response=>{
                return response.data
            }
        )
    },
    editStone(body){
        return instance.post('/stone/editStone',body).then(
            response=>{
                return response.data
            }
        )
    }
}
