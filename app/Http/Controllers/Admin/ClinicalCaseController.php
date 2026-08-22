<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreClinicalCaseRequest;
use App\Models\ClinicalCase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ClinicalCaseController extends Controller
{
    public function index(): View
    {
        $cases = ClinicalCase::orderBy('created_at')->get();

        return view('admin.clinical-cases.index', compact('cases'));
    }

    public function create(): View
    {
        $case = new ClinicalCase([
            'patient_profile' => ['initial' => '', 'age' => 0, 'gender' => 'Perempuan', 'room' => '', 'medicalDiagnosis' => '', 'dietOrder' => ''],
            'adime' => [
                'assessment' => ['antropometri' => '', 'biokimia' => [], 'fisikKlinis' => '', 'dietaryHistory' => ''],
                'diagnosisPES' => ['problem' => '', 'etiology' => '', 'signsSymptoms' => '', 'formattedPES' => ''],
                'intervention' => [
                    'tujuanDiet' => [], 'prinsipSyaratDiet' => [],
                    'perhitunganKebutuhan' => ['energi' => '', 'protein' => '', 'lemak' => '', 'karbohidrat' => '', 'cairan' => ''],
                    'menuContoh' => [],
                ],
                'monitoringEvaluasi' => [],
                'keyLearning' => '',
            ],
        ]);

        return view('admin.clinical-cases.create', compact('case'));
    }

    public function store(StoreClinicalCaseRequest $request): RedirectResponse
    {
        $data = $this->buildData($request);

        ClinicalCase::create($data);

        return redirect()->route('admin.clinical-cases.index')->with('status', 'Kasus tersimpan.');
    }

    public function edit(ClinicalCase $clinical_case): View
    {
        $case = $clinical_case;

        return view('admin.clinical-cases.edit', compact('case'));
    }

    public function update(StoreClinicalCaseRequest $request, ClinicalCase $clinical_case): RedirectResponse
    {
        $clinical_case->update($this->buildData($request));

        return redirect()->route('admin.clinical-cases.index')->with('status', 'Kasus tersimpan.');
    }

    public function destroy(ClinicalCase $clinical_case): RedirectResponse
    {
        $clinical_case->delete();

        return back()->with('status', 'Kasus dihapus.');
    }

    private function buildData(Request $request): array
    {
        $profile = $request->input('patient_profile', []);
        $adime = $request->input('adime', []);

        return [
            'code' => $request->input('code'),
            'title' => $request->input('title'),
            'patient_profile' => [
                'initial' => $profile['initial'] ?? '',
                'age' => is_numeric($profile['age'] ?? null) ? (int) $profile['age'] : 0,
                'gender' => $profile['gender'] ?? 'Perempuan',
                'room' => $profile['room'] ?? '',
                'medicalDiagnosis' => $profile['medicalDiagnosis'] ?? '',
                'dietOrder' => $profile['dietOrder'] ?? '',
            ],
            'adime' => [
                'assessment' => [
                    'antropometri' => $adime['assessment']['antropometri'] ?? '',
                    'biokimia' => array_values($adime['assessment']['biokimia'] ?? []),
                    'fisikKlinis' => $adime['assessment']['fisikKlinis'] ?? '',
                    'dietaryHistory' => $adime['assessment']['dietaryHistory'] ?? '',
                ],
                'diagnosisPES' => [
                    'problem' => $adime['diagnosisPES']['problem'] ?? '',
                    'etiology' => $adime['diagnosisPES']['etiology'] ?? '',
                    'signsSymptoms' => $adime['diagnosisPES']['signsSymptoms'] ?? '',
                    'formattedPES' => $adime['diagnosisPES']['formattedPES'] ?? '',
                ],
                'intervention' => [
                    'tujuanDiet' => array_values($adime['intervention']['tujuanDiet'] ?? []),
                    'prinsipSyaratDiet' => array_values($adime['intervention']['prinsipSyaratDiet'] ?? []),
                    'perhitunganKebutuhan' => [
                        'energi' => $adime['intervention']['perhitunganKebutuhan']['energi'] ?? '',
                        'protein' => $adime['intervention']['perhitunganKebutuhan']['protein'] ?? '',
                        'lemak' => $adime['intervention']['perhitunganKebutuhan']['lemak'] ?? '',
                        'karbohidrat' => $adime['intervention']['perhitunganKebutuhan']['karbohidrat'] ?? '',
                        'cairan' => $adime['intervention']['perhitunganKebutuhan']['cairan'] ?? '',
                    ],
                    'menuContoh' => array_values($adime['intervention']['menuContoh'] ?? []),
                ],
                'monitoringEvaluasi' => array_values($adime['monitoringEvaluasi'] ?? []),
                'keyLearning' => $adime['keyLearning'] ?? '',
            ],
            'key_learning' => $adime['keyLearning'] ?? '',
        ];
    }
}
