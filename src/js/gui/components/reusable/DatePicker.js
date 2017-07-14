var DatePicker = function(){

	var day = "00";
	var month = "00";
	var year = "0000";

	return {
		view: function(vnode){
			if(vnode.attrs.value){
				day = vnode.attrs.value.day.pad();
				month = vnode.attrs.value.month.pad();
				year = vnode.attrs.value.year.pad(4);
			}

			function update(){
				vnode.attrs.onchange({
					day: parseInt(day),
					month: parseInt(month),
					year: parseInt(year),
				});
			}

			return m(".datepicker",[
				m("input.input.datepicker-day[placeholder=00]",{
					value: day,
					onchange: function(e){
						day = e.target.value;
						update();
					}
				}),
				m(".datepicker-dash","-"),
				m("input.input.datepicker-month[placeholder=00]",{
					value: month,
					onchange: function(e){
						month = e.target.value;
						update();
					}
				}),
				m(".datepicker-dash","-"),
				m("input.input.datepicker-year[placeholder=0000]",{
					value: year,
					onchange: function(e){
						year = e.target.value;
						update();
					}
				})
			]);
		}
	};
};
