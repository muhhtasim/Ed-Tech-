(async () => {
  const base = 'http://localhost:5000';
  const headers = { 'Content-Type': 'application/json' };
  try {
    console.log('1) Registering user...');
    let res = await fetch(base + '/register', { method: 'POST', headers, body: JSON.stringify({ name: 'Smoke Tester', email: 'smoke+1@example.com', password: 'Password123!', role: 'admin', university: 'Test Univ' }) });
    console.log('register status:', res.status);
    console.log(await res.text());

    console.log('\n2) Logging in...');
    res = await fetch(base + '/login', { method: 'POST', headers, body: JSON.stringify({ email: 'smoke+1@example.com', password: 'Password123!' }) });
    console.log('login status:', res.status);
    const loginJson = await res.json().catch(() => null);
    console.log('login response:', loginJson);

    console.log('\n3) Adding a course (auth required)...');
    const token = loginJson?.token;
    const authHeaders = { ...headers, Authorization: token ? `Bearer ${token}` : '' };
    res = await fetch(base + '/add-course', { method: 'POST', headers: authHeaders, body: JSON.stringify({ title: 'Smoke Course', price: 10, category: 'Testing', description: 'Created by smoke test' }) });
    console.log('add-course status:', res.status);
    console.log(await res.text());

    console.log('\n4) Fetching courses...');
    res = await fetch(base + '/courses');
    console.log('courses status:', res.status);
    const courses = await res.json().catch(() => null);
    console.log('courses count:', Array.isArray(courses) ? courses.length : 'unknown');
    if (Array.isArray(courses)) console.log('first course:', courses[0]);

    console.log('\nSmoke test completed.');
  } catch (err) {
    console.error('Smoke test failed:', err);
    process.exit(1);
  }
})();
