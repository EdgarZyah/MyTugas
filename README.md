📝 MyTugas - Todo List App

Aplikasi Todo List berbasis web yang mendukung autentikasi user, pengelolaan tugas pribadi, dan fitur deadline. Dibangun dengan Next.js + Redux di frontend dan Node.js + Express + Sequelize + MySQL di backend.
🚀 Fitur

    Registrasi dan login dengan autentikasi JWT

    Menambahkan, mengedit, menandai selesai, dan menghapus tugas

    Tugas hanya ditampilkan sesuai dengan user yang login

    Deadline dengan notifikasi "Segera" dan "Terlewat"

    UI responsif dengan Tailwind CSS

⚙️ Setup Backend (server)
1. Masuk ke direktori backend

cd server

2. Install dependencies

npm install

3. Konfigurasi database

Buat file .env berdasarkan .env.example:

DB_NAME=mytugas_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret

4. Setup database (MySQL)

npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

5. Jalankan backend

npm start

API akan berjalan di http://localhost:3001
💻 Setup Frontend (client)
1. Masuk ke direktori frontend

cd client

2. Install dependencies

npm install

3. Konfigurasi environment

Buat file .env.local:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

4. Jalankan frontend (development)

npm run dev

Frontend berjalan di http://localhost:3000
5. Build frontend (production)

npm run build
npm start

🧪 Testing

Untuk testing backend secara manual, gunakan tools seperti Postman atau Insomnia.
Untuk frontend, jalankan dan coba login/register, lalu tambah, edit, tandai selesai, dan hapus todo.
