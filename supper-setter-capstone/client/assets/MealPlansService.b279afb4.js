import{q as s,A as t,l}from"./index.4addc2f7.js";class i{async createDay(e){const a=await s.post("api/days",{mealPlanId:e});return t.activeDays.push(a.data),a.data}async getDays(e){const a=await s.get("api/mealplans/"+e+"/days");t.activeDays=a.data}async deleteDay(e){const a=await s.delete("api/days/"+e);l.log(a.data),t.activeDays=a.data}async getDayInfoByDayId(e){const a=await s.get(`api/days/${e}`);t.activeDay=a.data,l.log(a.data)}}const y=new i;class d{async createMealPlan(e){const a=await s.post("/api/mealplans",{name:e});l.log(a.data),t.activeMealPlan=a.data;const c=await y.createDay(a.data.id);return t.activeDays=[c],a.data}async getMyMealPlans(){const e=await s.get("account/mealplans");l.log("got my mealplans",e.data),t.mealPlans=e.data}async getMealPlanById(e){const a=await s.get("/api/mealplans/"+e);t.activeMealPlan=a.data}async deleteMealPlan(e){await s.delete("api/mealplans/"+e),t.activeMealPlan=null}}const r=new d;export{y as d,r as m};
