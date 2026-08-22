@extends('layouts.app')

@section('content')

<script>
    // Shared smooth-scroll helper used by hero / footer CTAs that jump to a section id.
    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
</script>

<div x-data="{ resumeOpen: false, contactOpen: false, guestbookOpen: false }">

    @include('portfolio.partials.header')

    <main>
        @include('portfolio.partials.hero')

        @if($visibility->skripsi)
            @include('portfolio.partials.skripsi-lab')
        @endif

        @if($visibility->workbench)
            @include('portfolio.partials.workbench')
        @endif

        @if($visibility->cases)
            @include('portfolio.partials.clinical-cases')
        @endif

        @if($visibility->rotations)
            @include('portfolio.partials.rotations')
        @endif

        @if($visibility->media)
            @include('portfolio.partials.media')
        @endif

        @if($visibility->skills)
            @include('portfolio.partials.skills')
        @endif
    </main>

    @include('portfolio.partials.footer')

    @include('portfolio.partials.guestbook-fab')

    @include('portfolio.partials.modals.resume')

    @include('portfolio.partials.modals.contact')

    @include('portfolio.partials.modals.guestbook')

</div>

@endsection
