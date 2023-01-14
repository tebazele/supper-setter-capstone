import{_ as D,r as x,y as C,u as S,z as I,b as R,B,P as o,l as r,d as m,p as M,C as L,s as q,M as A,c,f as a,t as b,x as j,F as p,h as P,i as V,j as N,v as Y,o as y,D as h,g as T,A as i,m as E,n as F,k as z}from"./index.ea2c1fb6.js";import{d as g,m as w}from"./MealPlansService.70e26976.js";const O={setup(){const n=x(""),s=C({query:""}),u=S();I(()=>{i.activeDays&&f(i.activeDays)}),R(()=>{v(),_()});const t=B();async function f(e){try{await M.getPlannedMeals(e)}catch(l){o.error(l.message),r.log(l)}}async function v(){try{await g.getDays(t.params.mealPlanId)}catch(e){o.error(e.message),r.log(e)}}async function _(){try{await w.getMealPlanById(t.params.mealPlanId)}catch(e){r.log(e),o.error(e.message)}}return{filterBy:n,search:s,mealPlan:m(()=>i.activeMealPlan),days:m(()=>i.activeDays),plannedMealsByDay:m(()=>i.plannedMeals),myRecipes:m(()=>i.myRecipes),nonArchivedMyRecipes:m(()=>{let e=i.myRecipes.filter(l=>l.archived==!1);return n.value==""?e:(r.log(n.value),e.filter(l=>l.mealType[0]==n.value))}),async createDay(){try{await g.createDay(t.params.mealPlanId)}catch(e){r.error(e),o.error(e.message)}},async createPlannedMeal(e){try{r.log(e),await M.createPlannedMeal(e),L.getOrCreateInstance("#exampleModal").hide(),n.value="",s.query=""}catch(l){r.log(l),o.error(l.message)}},async createDayShoppingList(e){u.push({name:"ShoppingList",query:{day:`${e}`}})},async createMealPlanShoppingList(e){u.push({name:"ShoppingList",query:{mealplan:`${e}`}})},async deleteMealPlan(){try{await o.confirm("Are you sure you want to delete this meal plan?","You can't go back")&&(await w.deleteMealPlan(t.params.mealPlanId),u.push({name:"Account"}))}catch(e){r.log(e),o.error(e.message)}},async deleteDay(e){try{await o.confirm("Are you sure you want to delete this day?","")&&await g.deleteDay(e)}catch(l){r.log(l),o.error(l.message)}},async searchMyRecipes(){try{n.value="",await q.searchMyRecipes(s.query),s.query=""}catch(e){r.log(e),o.error(e.message)}}}},components:{MealPlan:A}},d=n=>(E("data-v-8a2a2689"),n=n(),F(),n),U={class:"container-fluid serif-pro"},G={class:"d-flex my-2 justify-content-between"},H={key:0,class:"mt-1 raleway d-flex justify-content-between"},J={class:"row"},K={class:"d-flex justify-content-between"},Q={class:"raleway"},W=["onClick"],X=["onClick"],Z=d(()=>a("i",{class:"mdi mdi-cart"},null,-1)),$={class:"text-end"},ee={class:"text-end d-flex justify-content-between"},ae=d(()=>a("i",{class:"mdi mdi-delete"},null,-1)),te=h("Delete Plan"),se=[ae,te],le=d(()=>a("i",{class:"mdi mdi-cart"},null,-1)),ne=h("List from MealPlan"),oe=[le,ne],re={class:"modal fade serif-pro",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},ie={class:"modal-dialog"},de={class:"modal-content"},ce=d(()=>a("div",{class:"modal-header"},[a("h1",{class:"modal-title fs-5",id:"exampleModalLabel"},"Your Recipes"),a("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),ye={class:"modal-body"},me=d(()=>a("button",{class:"rounded-end bg-primary btn-info mdi mdi-magnify"},null,-1)),ue=d(()=>a("h4",{class:"raleway"},"Sort Your Recipes",-1)),be={class:"d-flex"},he=["onClick"],_e={class:"roboto-slab"},pe=["src"],ge=d(()=>a("div",{class:"modal-footer"},[a("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close")],-1));function fe(n,s,u,t,f,v){const _=z("MealPlan");return y(),c(p,null,[a("div",U,[a("div",G,[t.mealPlan?(y(),c("h2",H,b(t.mealPlan.name),1)):j("",!0)]),a("section",J,[(y(!0),c(p,null,P(t.plannedMealsByDay,(e,l)=>(y(),c("div",{class:"col-12",key:l},[a("div",K,[a("h5",Q,[h("Day "+b(l+1)+" ",1),a("span",{onClick:k=>t.deleteDay(e.dayId),class:"mdi mdi-delete text-danger"},null,8,W)]),a("button",{onClick:k=>t.createDayShoppingList(e.dayId),class:"btn bg-primary border border-dark border-1"},[Z,h(" List Day "+b(l+1),1)],8,X)]),T(_,{plannedMealsArray:e.plannedMeals,dayId:e.dayId},null,8,["plannedMealsArray","dayId"])]))),128))]),a("div",$,[a("div",ee,[a("button",{onClick:s[0]||(s[0]=e=>t.deleteMealPlan()),class:"btn border border-dark bg-danger text-white selectable mb-2"},se),a("button",{onClick:s[1]||(s[1]=e=>t.createMealPlanShoppingList(t.mealPlan.id)),class:"btn bg-primary border border-dark border-1 mb-2"},oe),a("button",{class:"btn bg-secondary text-white border border-dark me-2 mb-2",onClick:s[2]||(s[2]=(...e)=>t.createDay&&t.createDay(...e))},"Add Day")])])]),a("div",re,[a("div",ie,[a("div",de,[ce,a("div",ye,[a("form",{onSubmit:s[4]||(s[4]=V(e=>t.searchMyRecipes(),["prevent"])),class:"my-2 text-end"},[N(a("input",{class:"rounded-start",type:"text","onUpdate:modelValue":s[3]||(s[3]=e=>t.search.query=e),placeholder:"Search Your Recipes"},null,512),[[Y,t.search.query]]),me],32),ue,a("div",be,[a("button",{onClick:s[5]||(s[5]=e=>{t.filterBy="breakfast",t.search.query=""}),class:"same-width btn btn-outline-dark me-1"},"Breakfast"),a("button",{onClick:s[6]||(s[6]=e=>{t.filterBy="lunch/dinner",t.search.query=""}),class:"same-width btn btn-outline-dark me-1"},"Lunch/ Dinner"),a("button",{onClick:s[7]||(s[7]=()=>{t.search.query="",t.searchMyRecipes()}),class:"same-width btn btn-outline-dark"},"All")]),(y(!0),c(p,null,P(t.nonArchivedMyRecipes,e=>(y(),c("section",{class:"row",key:e.edamamId},[a("div",{onClick:l=>t.createPlannedMeal(e.id),class:"selectable ms-3 mt-2 col-11 d-flex justify-content-between align-items-baseline m-1 bg-grey"},[a("p",_e,b(e.label),1),a("img",{src:e.image,alt:"food",class:"thumbnail selectable"},null,8,pe)],8,he)]))),128))]),ge])])])],64)}const Pe=D(O,[["render",fe],["__scopeId","data-v-8a2a2689"]]);export{Pe as default};