<?php

namespace App\Http\Controllers;

use App\Models\ClinicalCase;
use App\Models\GuestbookEntry;
use App\Models\MediaInfographic;
use App\Models\PersonalInfo;
use App\Models\RotationExperience;
use App\Models\SectionVisibility;
use App\Models\SkillsAndCompetency;
use App\Models\SkripsiResearch;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    public function index(): View
    {
        $personalInfo = PersonalInfo::first();
        $visibility = SectionVisibility::first();
        $skripsi = SkripsiResearch::first();
        $clinicalCases = ClinicalCase::orderBy('created_at')->get();
        $rotations = RotationExperience::orderBy('created_at')->get();
        $media = MediaInfographic::orderBy('created_at')->get();
        $skills = SkillsAndCompetency::first();
        $guestbookEntries = GuestbookEntry::orderByDesc('created_at')->get();

        return view('portfolio.index', compact(
            'personalInfo', 'visibility', 'skripsi', 'clinicalCases',
            'rotations', 'media', 'skills', 'guestbookEntries'
        ));
    }
}
