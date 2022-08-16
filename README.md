# Unsomnia
## Kelompok 22 Healthy Sleep Enjoyer
| Nama | NIM | Pembagian Tugas |
| ------ | ----| ---- |
|Antonio Natthan Krishna|16521027|  |
| Haidar Hamda|16521191| |
| Danang Ihsan|16521206| Menambah cara kerja pada README.md |
|Fatih Nararya Rashadyfa I.|16521238| Mengerjakan 95 persen aplikasi. Login, register, logout, alarm, membuat dan menghapus alarm, alarm menyala dan beralih ke game, game bisa dimainkan dan memiliki end screen deaktivasi, dan styling dari 99 persen aplikasinya. |
|Muhammad Aliefnaufal|16521319| |
|Jazmy Izzati Alamsyah|16521324| |
|Nazhif Haidar Putra Wibowo|16521335| |
|Jeffrey Chow|16521353| |
|Noel Christoffel Simbolon|16521355|Memperjelas langkah-langkah untuk menjalankan *webapp* pada README|
|Timothy Subekti|16521418| |
|Laila Bilbina Khoiru Nisa|16521508| |
|Nabilah Amanda Putri|16521511| |
|Aniqa Fayyaza Akbar|16521519| Mengubah warna pada page register dan menuliskan judul, nomor, dan nama kelompok pada readme. |

Judul Solusi : Final Solution to The Sleep Question  
Nomor Kelompok Milestone : 22  
Nama Kelompok : Healthy Sleep Enjoyer  

Project ini dibuat dengan [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Memulai Aplikasi

Pertama, lakukan *cloning* pada *repository* ini ke *local repository* komputer Anda.

```bash
git clone https://github.com/Fatih20/Milestone02_K22
```

Buka *directory* tersebut lalu *change directory* ke `/src`

```bash
cd src/
```

Dari *directory* tersebut, lakukan instalasi semua *dependecy* yang diperlukan dalam proyek ini.

```bash
npm i
```

Lalu, mulai server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) dengan browser Anda untuk melihat aplikasi ini. 

## Dokumentasi Web
1. Tampilan Awal WebApp Unsomnia
  
![image](https://user-images.githubusercontent.com/92136335/184679895-b1f16023-d218-4144-bfee-530073202371.png)
  
2. Halaman Log In Unsomnia
  
![image](https://user-images.githubusercontent.com/92136335/184681064-7392fe9e-f8e0-440e-8ca5-622ca394fa40.png)

3. Halaman Register 
  
![image](https://user-images.githubusercontent.com/92136335/184681463-09a24a3f-bae4-46a9-8d73-36660da9dd70.png)

4. Halaman Utama
  
![image](https://user-images.githubusercontent.com/92136335/184681649-364d139f-1a8f-4475-a942-654f56a29da0.png)

## Cara Kerja
1. Buka Webside [Unsomnia](https://unsomnia.herokuapp.com).

![image](https://user-images.githubusercontent.com/89301221/184844218-4d4599e9-e4ae-47b8-b1b8-de9a34806607.jpg)

2. Klik __Join Now__.

3. Muncul tampilan untuk memasukkan __Username__ dan __Password__, jika belum melakukan pendaftaran, klik _Registrasi_.

![image](https://user-images.githubusercontent.com/89301221/184844311-09d5baf1-ed28-440f-a8f2-c9d6515e5e69.jpg)

4. Isi __Username__, __Email__, __Password__, dan __Repeat Password__ lalu klik __Registrasi__.

![image](https://user-images.githubusercontent.com/89301221/184844659-5f92bc2a-f668-4fb5-92f0-2eaad1bcd1f6.jpg)

5. Setelah itu, akan muncul pilihan untuk membuat alarm. Isilah __Title__, __Description__, __Urgency__, __Hour__, dan __Minute__. Pada bagian __Urgency__, terdapat pilihan Low, Med, dan High, pilihan tersebut untuk menentukan seberapa penting alarm tersebut dan banyaknya puzzle yang harus diselesaikan. Untuk Low = 1 Puzzle, Mid = 2 Puzzle, dan High = 3 Puzzle.

![image](https://user-images.githubusercontent.com/89301221/184844481-fb96da4f-3c6e-41c8-a770-62bb3643cadd.jpg)

6. Setelah alarm dibuat, akan muncul daftar alarm dibagian _kiri_ dari bagian pembuatan alarm.

![image](https://user-images.githubusercontent.com/89301221/184844358-a666235e-0cb7-4f31-9a84-82c2b9668d10.jpg)

7. Pada saat waktu menunjukkan jam yang sama dengan salah satu alarm yang dibuat, maka alarm akan berbunyi dan memberikan puzzle. Pada bagian atas puzzle terdapat banyaknya puzzle yang harus diselesaikan sesuai dengan urgensi yang dibuat.

![image](https://user-images.githubusercontent.com/89301221/184844544-7f0ebd68-41ed-41c4-a9a0-2b6104f0e5d3.jpg)

8. User harus menyelesaikan puzzle dengan cara menyesuaikan 4 gambar yang sama, sebanyak 4x agar puzzle terselesaikan.

![image](https://user-images.githubusercontent.com/89301221/184844616-84e1280f-5378-49bc-93f3-07753b5245f8.jpg)

9. Setelah selesai, maka akan muncul gambar seperti dibawah ini sesuai dengan jam yang ditentukan dan tampilan akan kembali ke bagian daftar alarm.

![image](https://user-images.githubusercontent.com/89301221/184844568-da37040d-743e-4e1d-966a-a438f5dea9c5.jpg)

10. Untuk _Logout_, User dapat menekan bagian foto profil di bagian pojok kanan atas, lalu klik __Logout__. Setelah logout akan muncul tampilan awal.

![image](https://user-images.githubusercontent.com/89301221/184844526-eeb5cb54-79a3-4683-845d-b536288e342d.jpg)

## Saran Pengembangan
1. Peningkatan *User Interface* agar lebih mudah dan intuitif digunakan
2. Pemakaian *domain* yang lebih mudah diingat
3. Penambahan fitur yang sekiranya perlu dalam meningkatkan kualitas tidur

