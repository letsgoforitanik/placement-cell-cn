declare var $: any;

const txtDate = document.querySelector('#date');

$(txtDate).datepicker({
    dateFormat: "dd/mm/yy",
    minDate: 1,
});