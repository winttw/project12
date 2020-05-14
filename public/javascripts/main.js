const err_flash = $('.flash');
if (err_flash) {
    function expire(){err_flash.transition('fade down')}
    setTimeout(expire, 3000)
}
$('.ui.dropdown')
  .dropdown()
;
function onEnterP(event) {
    if (event.keyCode == 13) {
      alul();
    }
  } 

  function showChat() {
    $('.liveSupport')
    .transition({
      animation : 'scale',
      duration : '0.5s'
    });
  }
  function alul() {

    var today = `Today at ${new Date().getHours()}:${new Date().getMinutes()}`;
    var maindiv = document.getElementById('somerow');
    var inputVal = document.getElementById('reply').value;
    if (inputVal != '') {
    maindiv.innerHTML += `<div class="comment"><a class="avatar"><img class="tiny" src="../images/user.png"></a><div class="content"><a class="author">You</a><div class="metadata"><span class="date">${today}</span></div><div class="text">${inputVal}</div></div>`;
    document.getElementById('reply').value = '';
    }
    
  }
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
  });

signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
  });
  $('select.dropdown')
  .dropdown()
;
$('.ui.modal')
  .modal({
    centered: true
  }).modal('show')
;
function mapthing() {
  
task.employees.map((emp) => {
  return `<option value='${emp.display_name}></option>`
  });
}