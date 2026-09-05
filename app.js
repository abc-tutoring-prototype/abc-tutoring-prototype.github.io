const TUTORS = [
  { id: 't1', name: 'Maria Chen', subjects: ['Math', 'Algebra'], grades: '6-12', rate: 40,
    slots: ['Mon 4:00 PM', 'Mon 5:00 PM', 'Wed 4:00 PM', 'Fri 3:00 PM'] },
  { id: 't2', name: 'James Okafor', subjects: ['Science', 'Biology'], grades: '9-12', rate: 45,
    slots: ['Tue 3:30 PM', 'Thu 3:30 PM', 'Thu 4:30 PM'] },
  { id: 't3', name: 'Priya Patel', subjects: ['English', 'Writing'], grades: 'K-8', rate: 35,
    slots: ['Mon 3:00 PM', 'Wed 3:00 PM', 'Fri 4:00 PM'] },
  { id: 't4', name: 'Sam Torres', subjects: ['Spanish'], grades: 'K-12', rate: 38,
    slots: ['Tue 4:00 PM', 'Wed 5:00 PM'] },
  { id: 't5', name: 'Lena Kowalski', subjects: ['Math', 'SAT Prep'], grades: '9-12', rate: 50,
    slots: ['Mon 6:00 PM', 'Thu 6:00 PM', 'Sat 10:00 AM'] },
];

const BOOKINGS_KEY = 'abc_tutoring_bookings';

function getBookings() {
  try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || []; }
  catch { return []; }
}

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function bookedSlots(tutorId) {
  return getBookings().filter(b => b.tutorId === tutorId).map(b => b.slot);
}

function availableSlots(tutor) {
  const booked = bookedSlots(tutor.id);
  return tutor.slots.filter(s => !booked.includes(s));
}

function initials(name) {
  return name.split(' ').map(p => p[0]).join('');
}

function renderTutors() {
  const grid = document.getElementById('tutor-grid');
  grid.innerHTML = '';
  TUTORS.forEach(tutor => {
    const avail = availableSlots(tutor);
    const card = document.createElement('div');
    card.className = 'tutor-card';
    card.innerHTML = `
      <div class="tutor-photo">${initials(tutor.name)}</div>
      <h3>${tutor.name}</h3>
      <p class="muted">${tutor.subjects.join(', ')} · Grades ${tutor.grades}</p>
      <p class="rate">$${tutor.rate}/hr</p>
      <p class="muted">${avail.length} time${avail.length === 1 ? '' : 's'} available</p>
      <button class="btn-primary" data-tutor="${tutor.id}" ${avail.length === 0 ? 'disabled' : ''}>
        ${avail.length === 0 ? 'Fully booked' : 'Book'}
      </button>
    `;
    grid.appendChild(card);
    if (avail.length > 0) {
      card.querySelector('button').addEventListener('click', () => openModal(tutor.id));
    }
  });
}

let currentTutor = null;
let currentSlot = null;

function openModal(tutorId) {
  currentTutor = TUTORS.find(t => t.id === tutorId);
  currentSlot = null;
  posthog.capture('tutor_viewed', { tutor_id: currentTutor.id, tutor_name: currentTutor.name });

  document.getElementById('modal-tutor-name').textContent = currentTutor.name;
  document.getElementById('modal-tutor-subjects').textContent =
    `${currentTutor.subjects.join(', ')} · Grades ${currentTutor.grades} · $${currentTutor.rate}/hr`;

  const subjectSelect = document.getElementById('booking-subject');
  subjectSelect.innerHTML = currentTutor.subjects.map(s => `<option value="${s}">${s}</option>`).join('');

  const slotList = document.getElementById('slot-list');
  const avail = availableSlots(currentTutor);
  slotList.innerHTML = avail.length
    ? avail.map(s => `<button type="button" class="slot-btn" data-slot="${s}">${s}</button>`).join('')
    : '<p class="no-slots">No times left — check back later.</p>';
  slotList.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', () => selectSlot(btn.dataset.slot));
  });

  document.getElementById('modal-slots-view').classList.remove('hidden');
  document.getElementById('booking-form').classList.add('hidden');
  document.getElementById('modal-confirmation').classList.add('hidden');
  document.getElementById('booking-modal').classList.remove('hidden');
}

function selectSlot(slot) {
  currentSlot = slot;
  document.getElementById('chosen-slot-label').textContent = `Selected time: ${slot}`;
  document.getElementById('modal-slots-view').classList.add('hidden');
  document.getElementById('booking-form').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('booking-modal').classList.add('hidden');
  currentTutor = null;
  currentSlot = null;
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-done').addEventListener('click', () => {
  closeModal();
  renderTutors();
});

document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const booking = {
    tutorId: currentTutor.id,
    tutorName: currentTutor.name,
    slot: currentSlot,
    subject: document.getElementById('booking-subject').value,
    parentName: document.getElementById('parent-name').value,
    parentEmail: document.getElementById('parent-email').value,
    studentName: document.getElementById('student-name').value,
    studentGrade: document.getElementById('student-grade').value,
    bookedAt: new Date().toISOString(),
  };
  saveBooking(booking);

  posthog.capture('tutor_booked', {
    tutor_id: booking.tutorId,
    tutor_name: booking.tutorName,
    subject: booking.subject,
    slot: booking.slot,
  });

  document.getElementById('booking-form').classList.add('hidden');
  document.getElementById('modal-confirmation').classList.remove('hidden');
  e.target.reset();
});

renderTutors();
