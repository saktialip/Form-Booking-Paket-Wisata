//Langkah 1 : ambil elemen html yang akan di pakai
// ======================================================

const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice")
const pesanError = document.getElementById("pesanError");

//ambil elemen dari form
const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");

//Data paket wisata
const dataPaket = {
    "Bali Escape" : {
        durasi : "3 Hari 2 Malam", 
        malam: 2, 
        harga: 2450000},
    "Bromo Sunrise Trip" : {
        durasi : "2 Hari 1 Malam", 
        malam: 2, 
        harga: 1350000},
    "Raja Ampat Discovery" : {
        durasi : "4 Hari 3 Malam", 
        malam: 3, 
        harga: 5750000},
    "Labuan Bajo Explorer" : {
        durasi : "3 Hari 2 Malam", 
        malam: 2, 
        harga: 3950000}
}

//Langkah 2 : Formating

// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

//Langkah 3 : Perintah saat form di submit
// =============================================

formBooking.addEventListener("submit", function(event){
    //cegah halaman reload (kebiasaan bawaan form adalah reload)
    event.preventDefault();

    //ambil isi dari setiap form
const nama = inputNama.value;
const paket = inputPaket.value;
const jumlah = Number(inputJumlah.value); //ubah text jadi angka
const berangkat = inputBerangkat.value;

//validasi form
//semua pesan eror dikumpulkan di dalam array ini
const daftarError = [];

//mengubah string 2026-11-18 menjadi objek date JavaScript
//dengan begitu, kita bisa melakukan operasi tanggal
const tglBerangkat = new Date(berangkat);

//Tanggal hari ini (jamnya dibuang, sisakan tanggal saja)
const hariIni = new Date();
hariIni.setHours(0, 0, 0, 0); 

//1. Nama : tidak boleh kosong, min 3 karakter
// ==============================================
if (nama === "") {
    daftarError.push("Nama pemesan wajib diisi !")
} else if (nama.length <3){
    daftarError.push("Nama pemesan minimal 3 karakter !")
}
//push : digunakan untuk menambahkan data ke dalam array

//2.Pake tidak boleh kosong
// =============================

if (paket === "") {
    daftarError.push("Wajib memilih paket !")
}

//3.Jumlah orang tidak boleh kosong
//  jumlah orang < 1  ; jumlah orang minimal 1
//  jumlah orang > 20 ; jumlah orang maksimal 20
// =================================================

if (inputJumlah.value == "") {
    daftarError.push("Jumlah orang tidak boleh kosong !")
} else if (jumlah < 1) {
    daftarError.push("Jumkah orang minimal 1 !")
} else if (jumlah > 20) {
    daftarError.push("Jumlah orang maximal 20 !")
}

//4.Tanggal berangkat tidak boleh kosong
//  Tanggal berangkat tidak boleh kurang dari hari ini
if (berangkat === "") {
    daftarError.push("Tanggal Berangkat wajib diisi !")
} else if (tglBerangkat < hariIni) {
    daftarError.push("Tanggal Berangkat tidak boleh kurang dari Hari ini !")
}





//tampilkan eror
if (daftarError.length > 0){
    pesanError.innerHTML = daftarError.join("<br>");
    pesanError.classList.remove("d-none");
    return; //berhenti disini, dan invoice tidak ditampilkan

}
//textContent : membaca atau mengubah konten elemen menjadi text
//innerHTML : membaca elemen html

//ambil data paket yang dipilih, lalu dihitung
const detail = dataPaket[paket];

//total = harga per orang * jumlah orang
const total = detail.harga * jumlah;

//tampilkan harga ke invoice
document.getElementById("outNama").textContent = nama
document.getElementById("outPaket").textContent = paket
// document.getElementById("outBerangkat").textContent = formatTanggal(tglBerangkat);
document.getElementById("outDurasi").textContent = detail.durasi;
document.getElementById("outPeserta").textContent = jumlah + " orang";
document.getElementById("outTotal").textContent = formatRupiah(total);
document.getElementById("outHarga").textContent = formatRupiah(detail.harga);

//sembunyikan form, tampilkan invoice
bagianForm.classList.add("d-none");
bagianInvoice.classList.remove("d-none");


});