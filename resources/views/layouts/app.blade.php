<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', ($personalInfo->name ?? 'Della Puspa Ardiati') . ' — Portfolio Gizi Klinis')</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        serif: ['Instrument Serif', 'Georgia', 'serif'],
                        display: ['Syne', 'sans-serif'],
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    },
                },
            },
        };
    </script>

    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #F9F5F6;
            color: #4A4A4A;
        }

        h1, h2, h3, .font-serif-editorial {
            font-family: 'Instrument Serif', Georgia, serif;
        }

        .font-display-title {
            font-family: 'Syne', sans-serif;
        }

        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            background: #F9F5F6;
        }

        ::-webkit-scrollbar-thumb {
            background: #E0E0E0;
            border-radius: 9999px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #F8BBD0;
        }

        .artistic-glow-pink {
            background: radial-gradient(circle, rgba(248, 187, 208, 0.45) 0%, rgba(252, 228, 236, 0) 70%);
        }

        .artistic-glow-grey {
            background: radial-gradient(circle, rgba(224, 224, 224, 0.5) 0%, rgba(249, 245, 246, 0) 70%);
        }

        .lab-grid-pattern {
            background-size: 24px 24px;
            background-image:
                linear-gradient(to right, rgba(248, 187, 208, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(248, 187, 208, 0.15) 1px, transparent 1px);
        }

        .lab-dots-pattern {
            background-image: radial-gradient(rgba(248, 187, 208, 0.25) 1px, transparent 1px);
            background-size: 16px 16px;
        }

        [x-cloak] { display: none !important; }

        @media print {
            .print\:hidden { display: none !important; }
        }
    </style>

    @stack('styles')
</head>
<body class="min-h-screen bg-[#F9F5F6] text-[#4A4A4A] font-sans selection:bg-[#F8BBD0] selection:text-[#2D2D2D] relative overflow-x-hidden">

    <div class="fixed -top-32 -left-32 w-[550px] h-[550px] bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none -z-10"></div>
    <div class="fixed top-1/3 -right-32 w-[500px] h-[500px] bg-[#E0E0E0] rounded-full blur-3xl opacity-40 pointer-events-none -z-10"></div>
    <div class="fixed -bottom-32 left-1/4 w-[600px] h-[600px] bg-[#FCE4EC] rounded-full blur-3xl opacity-40 pointer-events-none -z-10"></div>

    @yield('content')

    @stack('scripts')

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide) lucide.createIcons();
        });
        document.addEventListener('alpine:updated', () => {
            if (window.lucide) lucide.createIcons();
        });
    </script>
</body>
</html>
