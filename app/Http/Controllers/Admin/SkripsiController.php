<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSkripsiRequest;
use App\Models\SkripsiResearch;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SkripsiController extends Controller
{
    public function edit(): View
    {
        $skripsi = SkripsiResearch::first() ?? new SkripsiResearch([
            'advisor' => [], 'hypotheses' => [], 'formulations' => [], 'key_takeaways' => [],
        ]);

        return view('admin.skripsi.edit', compact('skripsi'));
    }

    public function update(UpdateSkripsiRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['advisor'] = $request->input('advisor', []);
        $data['hypotheses'] = $request->input('hypotheses', []);
        $data['key_takeaways'] = $request->input('key_takeaways', []);
        $data['formulations'] = collect($request->input('formulations', []))->map(function ($f) {
            $num = fn ($v) => is_numeric($v) ? (float) $v : 0;

            return [
                'code' => $f['code'] ?? '',
                'ratio' => $f['ratio'] ?? '',
                'kelorPercent' => $num($f['kelorPercent'] ?? null),
                'bekatulPercent' => $num($f['bekatulPercent'] ?? null),
                'mocafPercent' => $num($f['mocafPercent'] ?? null),
                'organolepticScore' => [
                    'warna' => $num($f['organolepticScore']['warna'] ?? null),
                    'aroma' => $num($f['organolepticScore']['aroma'] ?? null),
                    'rasa' => $num($f['organolepticScore']['rasa'] ?? null),
                    'tekstur' => $num($f['organolepticScore']['tekstur'] ?? null),
                    'overall' => $num($f['organolepticScore']['overall'] ?? null),
                ],
                'proximate' => [
                    'fe' => $num($f['proximate']['fe'] ?? null),
                    'protein' => $num($f['proximate']['protein'] ?? null),
                    'serat' => $num($f['proximate']['serat'] ?? null),
                    'lemak' => $num($f['proximate']['lemak'] ?? null),
                    'energi' => $num($f['proximate']['energi'] ?? null),
                ],
                'isBestChoice' => ! empty($f['isBestChoice']),
            ];
        })->values()->all();

        SkripsiResearch::query()->first()?->update($data) ?? SkripsiResearch::create($data);

        return back()->with('status', 'Perubahan tersimpan.');
    }
}
