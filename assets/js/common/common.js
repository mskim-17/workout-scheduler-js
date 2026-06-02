document.querySelectorAll('[data-role="password-wrapper"]').forEach(wrapper => {
  const passwordInput = wrapper.querySelector('input');
  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.classList.add('toggle-password');
  toggleBtn.innerHTML = '<img src="/assets/images/common/eye-slash-solid.svg" alt="비밀번호 보기">';
  wrapper.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    let newInputType = passwordInput.type === 'password' ? 'text' : 'password';
    toggleBtn.classList.toggle('show');
    toggleBtn.querySelector('img').src = newInputType === 'password' ? 
      '/assets/images/common/eye-slash-solid.svg' :
      '/assets/images/common/eye-solid.svg';
    passwordInput.type = newInputType;
  });
});