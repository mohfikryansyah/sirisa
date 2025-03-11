<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengaduan Baru Diterima</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .header {
            background: #187f80;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: left;
            color: #333;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }
        .button {
            background: #187f80;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
            text-align: center;
        }
        .button:hover {
            background: #145f5f;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            padding: 15px;
            margin-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            📢 Pengaduan Baru Diterima
        </div>
        <div class="content">
            <p><strong>Nama Pengadu:</strong> {{ $complaint->name }}</p>
            <p><strong>Telepon:</strong> {{ $complaint->telp }}</p>
            <p><strong>Laporan Kejadian:</strong></p>
            <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #187f80;">
                {{ $complaint->message }}
            </p>
            <p><strong>Lokasi:</strong> <a href="https://www.google.com/maps?q={{ $complaint->latitude }},{{ $complaint->longitude }}" target="_blank">Lihat di Google Maps</a></p>

            <p style="text-align: center;">
                <a href="{{ url('/complaint ') }}" class="button">Lihat Detail Pengaduan</a>
            </p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Sirisa - Sistem Informasi Risiko Sumber Daya Alam
        </div>
    </div>
</body>
</html>
