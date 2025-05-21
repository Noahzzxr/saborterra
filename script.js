document.addEventListener('DOMContentLoaded', function() {
  // Navegação entre os passos da reserva
  const nextToStep2 = document.getElementById('next-to-step-2');
  const nextToStep3 = document.getElementById('next-to-step-3');
  const backToStep1 = document.getElementById('back-to-step-1');
  const backToStep2 = document.getElementById('back-to-step-2');
  const submitReservation = document.getElementById('submit-reservation');
  const newReservation = document.getElementById('new-reservation');
  
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const successMessage = document.getElementById('success-message');
  
  // Progress steps
  const progressSteps = document.querySelectorAll('.progress-step');
  
  // Seleção de horário
  const timeSlots = document.querySelectorAll('.time-slot');
  const selectedTimeInput = document.getElementById('selected-time');
  
  // Seleção de mesa
  const tableSelections = document.querySelectorAll('.table-selection');
  const selectedTableInput = document.getElementById('selected-table');
  
  // Checkboxes de restrições
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  const dietaryRestrictionsInput = document.getElementById('dietary-restrictions');
  
  // Radios de ocasião especial
  const radios = document.querySelectorAll('.custom-radio');
  const specialOccasionInput = document.getElementById('special-occasion');
  
  // Validação do passo 1
  nextToStep2.addEventListener('click', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const partySize = document.getElementById('party-size').value;
    
    if (!fullName || !email || !phone || !partySize) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    
    // Atualizar o progresso
    progressSteps[0].classList.remove('active');
    progressSteps[1].classList.add('active');
  });
  
  // Validação do passo 2
  nextToStep3.addEventListener('click', function(e) {
    e.preventDefault();
    
    const reservationDate = document.getElementById('reservation-date').value;
    const selectedTime = selectedTimeInput.value;
    const selectedTable = selectedTableInput.value;
    
    if (!reservationDate || !selectedTime || !selectedTable) {
      alert('Por favor, selecione uma data, horário e mesa.');
      return;
    }
    
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
    
    // Atualizar o progresso
    progressSteps[1].classList.remove('active');
    progressSteps[2].classList.add('active');
  });
  
  // Voltar para o passo 1
  backToStep1.addEventListener('click', function(e) {
    e.preventDefault();
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    
    // Atualizar o progresso
    progressSteps[1].classList.remove('active');
    progressSteps[0].classList.add('active');
  });
  
  // Voltar para o passo 2
  backToStep2.addEventListener('click', function(e) {
    e.preventDefault();
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
    
    // Atualizar o progresso
    progressSteps[2].classList.remove('active');
    progressSteps[1].classList.add('active');
  });
  
  // Seleção de horário
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      // Remove a seleção de todos os slots
      timeSlots.forEach(s => s.classList.remove('selected'));
      
      // Adiciona a seleção ao slot clicado
      this.classList.add('selected');
      
      // Atualiza o valor do input hidden
      selectedTimeInput.value = this.textContent.trim();
    });
  });
  
  // Seleção de mesa
  tableSelections.forEach(table => {
    table.addEventListener('click', function() {
      // Remove a seleção de todas as mesas
      tableSelections.forEach(t => t.classList.remove('selected'));
      
      // Adiciona a seleção à mesa clicada
      this.classList.add('selected');
      
      // Atualiza o valor do input hidden
      selectedTableInput.value = this.getAttribute('data-table');
    });
  });
  
  // Checkboxes de restrições
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      this.classList.toggle('selected');
      
      // Atualiza o valor do input hidden com todas as restrições selecionadas
      const selected = Array.from(document.querySelectorAll('.custom-checkbox.selected'))
        .map(el => el.nextElementSibling.textContent.trim())
        .join(', ');
      
      dietaryRestrictionsInput.value = selected;
    });
  });
  
  // Radios de ocasião especial
  radios.forEach(radio => {
    radio.addEventListener('click', function() {
      // Remove a seleção de todos os radios
      radios.forEach(r => r.classList.remove('selected'));
      
      // Adiciona a seleção ao radio clicado
      this.classList.add('selected');
      
      // Atualiza o valor do input hidden
      specialOccasionInput.value = this.getAttribute('data-occasion');
    });
  });
  
  // Submissão da reserva
  submitReservation.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Simular processamento da reserva
    setTimeout(() => {
      step3.classList.add('hidden');
      successMessage.classList.remove('hidden');
      
      // Preencher os dados de confirmação
      document.getElementById('confirmation-date').textContent = document.getElementById('reservation-date').value;
      document.getElementById('confirmation-time').textContent = selectedTimeInput.value;
      document.getElementById('confirmation-guests').textContent = document.getElementById('party-size').value + ' pessoas';
      document.getElementById('confirmation-table').textContent = 'Mesa ' + selectedTableInput.value;
      
      // Atualizar o progresso
      progressSteps[2].classList.remove('active');
    }, 1000);
  });
  
  // Nova reserva
  newReservation.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Resetar o formulário
    document.querySelector('form').reset();
    timeSlots.forEach(s => s.classList.remove('selected'));
    tableSelections.forEach(t => t.classList.remove('selected'));
    checkboxes.forEach(c => c.classList.remove('selected'));
    radios[0].classList.add('selected');
    
    // Voltar para o primeiro passo
    successMessage.classList.add('hidden');
    step1.classList.remove('hidden');
    
    // Resetar o progresso
    progressSteps[0].classList.add('active');
    progressSteps[1].classList.remove('active');
    progressSteps[2].classList.remove('active');
  });
  
  // Efeito hover nos cards de menu
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});