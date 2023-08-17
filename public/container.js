document.addEventListener("alpine:init", () => {
    Alpine.data('container', () => ({
        
        //get price plans
        showPrices : true,
        hidePrices : false,
        pricePlans: [],
        getPricePlan() {
            axios.get('https://price-plans.onrender.com/api/price_plans/').then((result) => {
                this.pricePlans = result.data.price_plans;
                console.log(this.pricePlans);
                this.showPrices = false;
                this.hidePrices = true;
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        },
        hidePricePlan(){
            this.showPrices = true;
            this.hidePrices = false;
        },

        //calculate total bill
        planName1:'',
        dataUsage:'',
        error1:'',
        answer1:'',
        showError1:false,
        showAnswer1: false,
        showReset1: false,
        showSubmit1: true,
        showInputs1:true,
        calculateTotal(){
            axios.post('https://price-plans.onrender.com/api/phonebill/', {
                price_plan: this.planName1,
                actions : this.dataUsage
              }).then((result)=>{
                 if(result.data.error){
                    this.error1 = result.data.error;
                    this.showError1 = true;
                    this.showReset1 = true;
                    this.planName1 ='';
                    this.dataUsage='';
                    this.showInputs1=false;
                    this.showSubmit1=false;
                 }
                 else{
                    this.answer1 = result.data.total;
                    this.showAnswer1 = true;
                    this.showReset1 = true;
                    this.planName1 ='';
                    this.dataUsage='';
                    this.showInputs1=false;
                    this.showSubmit1=false;
                 }
              })
        },
        reset1(){
            this.planName1 = '';
            this.dataUsage = '';
            this.error1='';
            this.answer1='';
            this.showError1=false;
            this.showAnswer1=false;
            this.showReset1= false;
            this.showSubmit1= true;
            this.showInputs1=true;
        },

        //create new price plan
        planName2:'',
        smsPrice:'',
        callPrice:'',
        answer2:'',
        error2:'',
        showInputs2: true,
        showSubmit2:true,
        showAnswer2:false,
        showError2:false,
        showReset2:false,
        createPlan(e) {
            e.preventDefault();
            console.log("Button clicked. Starting createPlan function...");
        
            axios.post('https://price-plans.onrender.com/api/price_plan/create', {
                plan_name: this.planName2,
                sms_price: parseFloat(this.smsPrice).toFixed(2),
                call_price: parseFloat(this.callPrice).toFixed(2)
            }).then((result) => {
                console.log("POST request successful. Result:", result);
        
                if (result.data.error) {
                    console.log("Error detected:", result.data.error);
        
                    this.error2 = result.data.error;
                    this.showError2 = true;
                    this.showReset2 = true;
                    this.planName2 = '';
                    this.smsPrice = '';
                    this.callPrice = '';
                    this.showInputs2 = false;
                    this.showSubmit2 = false;
                } else {
                    console.log("No error. Success message:", result.data.message);
        
                    this.answer2 = result.data.message;
                    this.showAnswer2 = true;
                    this.showReset2 = true;
                    this.planName2 = '';
                    this.smsPrice = '';
                    this.callPrice = '';
                    this.showInputs2 = false;
                    this.showSubmit2 = false;
                }
            }).catch((error) => {
                console.error('Error during POST request:', error);
            });
            console.log("End of createPlan function.");
        },

        reset2(){
            this.planName2='';
            this.smsPrice='';
            this.callPrice='';
            this.answer2='';
            this.error2='';
            this.showInputs2=true;
            this.showSubmit2=true;
            this.showAnswer2=false;
            this.showError2=false;
            this.showReset2=false;
        },

        //Update price plan
        showInputs3:true,
        planName3:'',
        smsPriceUpdate:'',
        callPriceUpdate:'',
        answer3:'',
        showAnswer3:false,
        error3:'',
        showError3:false,
        showReset3:false,
        showSubmit3:true,

        updatePlan(){
            axios.post('https://price-plans.onrender.com/api/price_plan/update',{
                plan_name : this.planName3,
                sms_price : parseFloat(this.smsPriceUpdate).toFixed(2),
                call_price : parseFloat(this.callPriceUpdate).toFixed(2)
            }).then((result)=>{
                if(result.data.error){
                    this.error3 = result.data.error;
                    this.showError3 = true;
                    this.planName3 = '';
                    this.smsPriceUpdate = '';
                    this.callPriceUpdate = '';
                    this.showInputs3 = false;
                    this.showSubmit3 = false;
                    this.showReset3 = true;

                }
                else{
                    this.answer3 = result.data.message;
                    this.showAnswer3 = true;
                    this.planName3 = '';
                    this.smsPriceUpdate = '';
                    this.callPriceUpdate = '';
                    this.showInputs3 = false;
                    this.showSubmit3 = false;
                    this.showReset3 = true;
                }
            })
        },

        reset3(){
            this.showInputs3=true;
            this.planName3='';
            this.smsPriceUpdate='';
            this.callPriceUpdate='';
            this.answer3='';
            this.showAnswer3=false;
            this.error3='';
            this.showError3=false;
            this.showReset3=false;
            this.showSubmit3 = true;

        },


        //Delete price plan
        showInputs4: true,
        planName4:'',
        answer4:'',
        showAnswer4: false,
        error4:'',
        showError4:false,
        showReset4:false,
        showSubmit4:true,
        deletePlan(){
            axios.post('https://price-plans.onrender.com/api/price_plan/delete', {
                plan_name: this.planName4
            }).then((result) => {
                if(result.data.error){
                    this.error4=result.data.error;
                    this.planName4='';
                    this.showError4=true;
                    this.showInputs4=false;
                    this.showReset4=true;
                    this.showSubmit4=false;
                }else{
                    this.answer4=result.data.message;
                    this.planName4='';
                    this.showAnswer4=true;
                    this.showInputs4=false;
                    this.showReset4=true;
                    this.showSubmit4=false;
                }
            })
        },

        reset4(){
            this.showInputs4= true;
            this.planName4='';
            this.answer4='';
            this.showAnswer4= false;
            this.error4='';
            this.showError4=false;
            this.showReset4=false;
            this.showSubmit4=true;
        }

    }));
});