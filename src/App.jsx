import React, { useState } from 'react';

export default function App() {
  // 구약 성경
  const oldTestament = [
    { name: '창세기', english: 'Genesis', chapters: 50 },
    { name: '출애굽기', english: 'Exodus', chapters: 40 },
    { name: '레위기', english: 'Leviticus', chapters: 27 },
    { name: '민수기', english: 'Numbers', chapters: 36 },
    { name: '신명기', english: 'Deuteronomy', chapters: 34 },
    { name: '여호수아', english: 'Joshua', chapters: 24 },
    { name: '사사기', english: 'Judges', chapters: 21 },
    { name: '룻기', english: 'Ruth', chapters: 4 },
    { name: '사무엘상', english: '1 Samuel', chapters: 31 },
    { name: '사무엘하', english: '2 Samuel', chapters: 24 },
    { name: '열왕기상', english: '1 Kings', chapters: 22 },
    { name: '열왕기하', english: '2 Kings', chapters: 25 },
    { name: '역대상', english: '1 Chronicles', chapters: 29 },
    { name: '역대하', english: '2 Chronicles', chapters: 36 },
    { name: '에스라', english: 'Ezra', chapters: 10 },
    { name: '느헤미야', english: 'Nehemiah', chapters: 13 },
    { name: '에스더', english: 'Esther', chapters: 10 },
    { name: '욥기', english: 'Job', chapters: 42 },
    { name: '시편', english: 'Psalms', chapters: 150 },
    { name: '잠언', english: 'Proverbs', chapters: 31 },
    { name: '전도서', english: 'Ecclesiastes', chapters: 12 },
    { name: '아가', english: 'Song of Solomon', chapters: 8 },
    { name: '이사야', english: 'Isaiah', chapters: 66 },
    { name: '예레미야', english: 'Jeremiah', chapters: 52 },
    { name: '예레미야애가', english: 'Lamentations', chapters: 5 },
    { name: '에스겔', english: 'Ezekiel', chapters: 48 },
    { name: '다니엘', english: 'Daniel', chapters: 12 },
    { name: '호세아', english: 'Hosea', chapters: 14 },
    { name: '요엘', english: 'Joel', chapters: 3 },
    { name: '아모스', english: 'Amos', chapters: 9 },
    { name: '오바댜', english: 'Obadiah', chapters: 1 },
    { name: '요나', english: 'Jonah', chapters: 4 },
    { name: '미가', english: 'Micah', chapters: 7 },
    { name: '나훔', english: 'Nahum', chapters: 3 },
    { name: '하박국', english: 'Habakkuk', chapters: 3 },
    { name: '스바냐', english: 'Zephaniah', chapters: 3 },
    { name: '학개', english: 'Haggai', chapters: 2 },
    { name: '스가랴', english: 'Zechariah', chapters: 14 },
    { name: '말라기', english: 'Malachi', chapters: 4 }
  ];

  // 신약 성경
  const newTestament = [
    { name: '마태복음', english: 'Matthew', chapters: 28 },
    { name: '마가복음', english: 'Mark', chapters: 16 },
    { name: '누가복음', english: 'Luke', chapters: 24 },
    { name: '요한복음', english: 'John', chapters: 21 },
    { name: '사도행전', english: 'Acts', chapters: 28 },
    { name: '로마서', english: 'Romans', chapters: 16 },
    { name: '고린도전서', english: '1 Corinthians', chapters: 16 },
    { name: '고린도후서', english: '2 Corinthians', chapters: 13 },
    { name: '갈라디아서', english: 'Galatians', chapters: 6 },
    { name: '에베소서', english: 'Ephesians', chapters: 6 },
    { name: '빌립보서', english: 'Philippians', chapters: 4 },
    { name: '골로새서', english: 'Colossians', chapters: 4 },
    { name: '데살로니가전서', english: '1 Thessalonians', chapters: 5 },
    { name: '데살로니가후서', english: '2 Thessalonians', chapters: 3 },
    { name: '디모데전서', english: '1 Timothy', chapters: 6 },
    { name: '디모데후서', english: '2 Timothy', chapters: 4 },
    { name: '디도서', english: 'Titus', chapters: 3 },
    { name: '빌레몬서', english: 'Philemon', chapters: 1 },
    { name: '히브리서', english: 'Hebrews', chapters: 13 },
    { name: '야고보서', english: 'James', chapters: 5 },
    { name: '베드로전서', english: '1 Peter', chapters: 5 },
    { name: '베드로후서', english: '2 Peter', chapters: 3 },
    { name: '요한일서', english: '1 John', chapters: 5 },
    { name: '요한이서', english: '2 John', chapters: 1 },
    { name: '요한삼서', english: '3 John', chapters: 1 },
    { name: '유다서', english: 'Jude', chapters: 1 },
    { name: '요한계시록', english: 'Revelation', chapters: 22 }
  ];

  const [step, setStep] = useState(1);
  const [testamentTab, setTestamentTab] = useState('old'); // 'old' or 'new'
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [script, setScript] = useState('');
  const [imagePrompts, setImagePrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState('');
  
  // 모달 관련
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [editInstruction, setEditInstruction] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setStep(2);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setStep(3);
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const downloadText = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateScript = async () => {
    setLoading(true);
    setLoadingMessage('대본을 생성 중입니다...');
    setError('');

    const prompt = `당신은 전문 기독교 QT(Quiet Time) 대본 작가입니다.

**목표:**
아침 명상용 성경 QT 대본을 작성해주세요. 전문 성우가 잔잔하고 따뜻한 목소리로 읽을 10분 분량의 대본입니다.

**대본 요구사항:**

1. **톤 & 스타일:**
   - 아침에 어울리는 부드럽고 따뜻한 어조
   - 명상적이고 평화로운 분위기
   - 청취자에게 직접 말하듯 친근하면서도 정중한 느낌
   - **말투:** "~습니다/~겠습니다" 체로 정중하게

2. **구절 배치 (매우 중요!):**
   성경 구절을 초반에 몰아서 읽지 마세요!
   - 핵심 구절 3개를 선정하되, 대본 전체에 걸쳐 분산 배치하세요
   - 패턴: [구절1 → 설명/해석] → [구절2 → 설명/해석] → [구절3 → 적용]
   - 각 구절을 읽은 직후에 바로 그 구절에 대한 깊은 설명과 해석을 제공
   - 이렇게 하면 청취자가 구절의 의미를 더 깊이 이해하고 감동받을 수 있습니다

3. **구조:**
   - **오프닝 (1분):** 아침 인사 & 오늘의 본문 소개
   - **구절1 + 배경설명 (2.5분):** 첫 번째 핵심 구절 읽기 → 역사적/문화적 배경 설명
   - **구절2 + 의미해석 (2.5분):** 두 번째 핵심 구절 읽기 → 영적 의미와 뜻풀이
   - **구절3 + 삶의적용 (2.5분):** 세 번째 핵심 구절 읽기 → 오늘 삶에 적용하는 방법
   - **기도 (1분):** 함께 드리는 기도
   - **클로징 (0.5분):** 희망찬 마무리 인사

4. **구절 인용 방식:**
   - 구절을 인용할 때 반드시 **몇 절인지 먼저 언급**한 후 내용을 읽어주세요
   - 예시: "5절 말씀입니다. '여호와께서...(구절 내용)'"

5. **기도 시간 형식:**
   "하나님 아버지, 감사합니다. 
   오늘 ${selectedBook.name} ${selectedChapter}장 말씀을 통해 [핵심 깨달음]을 배웠습니다.
   [구체적인 기도 내용]
   예수님의 이름으로 기도드립니다. 아멘."

6. **클로징 형식:**
   - "오늘 하루도 당신의 인생이 하나님의 은혜 가운데 빛나시길 바랍니다."
   - "내일 또 말씀으로 뵙겠습니다." (이 문장으로 항상 마무리)

7. **기술적 요구사항:**
   - 총 분량: 약 1,300~1,500 단어 (10분 낭독 기준)
   - 섹션 마커 넣지 마세요. 순수 대본만 작성해주세요.

**오늘의 본문:**
${selectedBook.name} ${selectedChapter}장 (${selectedBook.english} Chapter ${selectedChapter})

${additionalNotes ? `**추가 참고 자료:**\n${additionalNotes}` : ''}

먼저 ${selectedBook.name} ${selectedChapter}장의 내용을 웹에서 검색한 후 대본을 작성해주세요.
대본만 출력하고, 다른 설명은 하지 마세요.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8000,
          tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) throw new Error(`API 오류: ${response.status}`);

      const data = await response.json();
      let scriptText = '';
      for (const block of data.content) {
        if (block.type === 'text') scriptText += block.text + '\n';
      }

      setScript(scriptText.trim());
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('대본 생성 중 오류: ' + error.message);
      setLoading(false);
    }
  };

  const confirmScript = () => {
    setStep(4);
  };

  const generateImagePrompts = async () => {
    setLoading(true);
    setLoadingMessage('이미지 프롬프트를 생성 중입니다...');
    setError('');
    
    const prompt = `당신은 고급 종이 공예(Paper Art) 이미지 프롬프트 전문가입니다.

**목표:**
아래 QT 대본을 바탕으로 20장의 이미지 프롬프트를 생성해주세요.

**가장 중요한 규칙 - 대본 순서 엄격히 따르기:**
대본을 처음부터 끝까지 읽으면서, 각 문단/섹션에 해당하는 이미지를 순서대로 만드세요.
각 프롬프트에 대본의 어느 부분(핵심 문장)을 시각화했는지 명시해주세요.

**출력 형식 (반드시 따르세요):**
#1:
- 대본 위치: "대본에서 해당하는 핵심 문장이나 구절을 그대로 인용"
- 영문 프롬프트: Bright layered paper craft illustration of...
- 한글 설명: 이 이미지는 ~를 표현합니다

#2:
- 대본 위치: "대본에서 해당하는 핵심 문장"
- 영문 프롬프트: ...
- 한글 설명: ...

**스타일:**
- 밝고 따뜻한 색상: warm cream, soft yellow, dusty rose, terracotta, sage green
- 깔끔한 레이어드 페이퍼 컷 스타일
- 밝은 배경 (cream, ivory, light beige)
- 16:9 aspect ratio 필수

**한글 텍스트 vs 순수 이미지:**
- 35% (7장): 한글 텍스트 포함 - #1, #5, #9, #12, #15, #18, #20
- 65% (13장): 순수 이미지만

**20장 구성:**
- #1-2: 오프닝
- #3-6: 첫 번째 구절 + 배경설명
- #7-10: 두 번째 구절 + 의미해석
- #11-14: 세 번째 구절 + 삶의적용
- #15-17: 종합 정리
- #18-19: 기도
- #20: 클로징

**대본:**
${script}

**본문:**
${selectedBook.name} ${selectedChapter}장

이제 20개의 이미지 프롬프트를 위 형식대로 생성해주세요.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 10000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) throw new Error(`API 오류: ${response.status}`);

      const data = await response.json();
      let promptsText = '';
      for (const block of data.content) {
        if (block.type === 'text') promptsText += block.text + '\n';
      }

      // 파싱
      const parsedPrompts = [];
      const blocks = promptsText.split(/(?=#\d+:)/);
      
      for (const block of blocks) {
        const numMatch = block.match(/^#(\d+):/);
        if (!numMatch) continue;
        
        const number = numMatch[1];
        const scriptRefMatch = block.match(/대본 위치:\s*[""]?([^"""\n]+)[""]?/);
        const engMatch = block.match(/영문 프롬프트:\s*([^\n]+(?:\n(?!-)[^\n]+)*)/);
        const korMatch = block.match(/한글 설명:\s*([^\n]+(?:\n(?!#)[^\n]+)*)/);
        
        parsedPrompts.push({
          number,
          scriptRef: scriptRefMatch ? scriptRefMatch[1].trim() : '',
          prompt: engMatch ? engMatch[1].trim() : '',
          koreanDesc: korMatch ? korMatch[1].trim() : ''
        });
      }

      if (parsedPrompts.length === 0) throw new Error('프롬프트 파싱 실패');

      setImagePrompts(parsedPrompts);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('이미지 프롬프트 생성 중 오류: ' + error.message);
      setLoading(false);
    }
  };

  // 개별 프롬프트 수정
  const regeneratePrompt = async (index) => {
    if (!editInstruction.trim()) return;
    
    setEditLoading(true);
    const currentPrompt = imagePrompts[index];
    
    const prompt = `현재 이미지 프롬프트를 수정해주세요.

**현재 프롬프트:**
- 영문: ${currentPrompt.prompt}
- 한글 설명: ${currentPrompt.koreanDesc}
- 대본 위치: ${currentPrompt.scriptRef}

**수정 요청:**
${editInstruction}

**스타일 유지:**
- 밝고 따뜻한 종이 공예 스타일
- 16:9 aspect ratio
- warm cream, soft yellow, dusty rose 색상

**출력 형식:**
- 영문 프롬프트: (수정된 영문 프롬프트)
- 한글 설명: (수정된 한글 설명)`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content[0]?.text || '';
      
      const engMatch = text.match(/영문 프롬프트:\s*([^\n]+(?:\n(?!-)[^\n]+)*)/);
      const korMatch = text.match(/한글 설명:\s*([^\n]+)/);
      
      if (engMatch) {
        const newPrompts = [...imagePrompts];
        newPrompts[index] = {
          ...newPrompts[index],
          prompt: engMatch[1].trim(),
          koreanDesc: korMatch ? korMatch[1].trim() : currentPrompt.koreanDesc
        };
        setImagePrompts(newPrompts);
        setEditInstruction('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    setEditLoading(false);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedBook(null);
    setSelectedChapter(null);
    setAdditionalNotes('');
    setScript('');
    setImagePrompts([]);
    setError('');
    setSelectedPrompt(null);
  };

  // 대본에서 해당 텍스트 하이라이트
  const getHighlightedScript = () => {
    if (imagePrompts.length === 0) return script;
    
    let highlightedScript = script;
    const markers = [];
    
    imagePrompts.forEach((p, idx) => {
      if (p.scriptRef && p.scriptRef.length > 10) {
        const searchText = p.scriptRef.substring(0, 30);
        const position = script.indexOf(searchText);
        if (position !== -1) {
          markers.push({ position, number: p.number, length: searchText.length });
        }
      }
    });
    
    return { script, markers };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-4 px-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h1 className="text-lg font-black text-white">하루 딱! 한 장</h1>
              <p className="text-purple-200 text-xs">QT 대본 & 이미지 프롬프트</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-1">
            {[
              { num: 1, label: '성경' },
              { num: 2, label: '장' },
              { num: 3, label: '대본' },
              { num: 4, label: '이미지' }
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  step >= s.num ? 'bg-white text-purple-600' : 'bg-white/20 text-white/60'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                {i < 3 && <div className={`w-4 h-0.5 ${step > s.num ? 'bg-white' : 'bg-white/20'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step > 1 && (
            <button onClick={resetAll} className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm font-bold">
              🔄 새로운 장
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {error && (
          <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
            {error}
          </div>
        )}

        {/* Step 1: 성경 선택 (구약/신약 탭) */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-black text-white mb-4">📚 성경 선택</h2>
            
            {/* 구약/신약 탭 */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTestamentTab('old')}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${
                  testamentTab === 'old'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                📜 구약성경 <span className="text-sm opacity-80">(39권)</span>
              </button>
              <button
                onClick={() => setTestamentTab('new')}
                className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all ${
                  testamentTab === 'new'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                ✝️ 신약성경 <span className="text-sm opacity-80">(27권)</span>
              </button>
            </div>

            {/* 성경 목록 */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {(testamentTab === 'old' ? oldTestament : newTestament).map((book) => (
                <button
                  key={book.name}
                  onClick={() => handleBookSelect(book)}
                  className={`p-2 border rounded-xl text-white text-xs font-medium transition-all hover:scale-105 ${
                    testamentTab === 'old'
                      ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400'
                      : 'bg-sky-500/10 border-sky-500/30 hover:bg-sky-500/30 hover:border-sky-400'
                  }`}
                >
                  {book.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 장 선택 */}
        {step === 2 && selectedBook && (
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <button onClick={() => setStep(1)} className="text-purple-300 hover:text-white text-sm mb-4">
              ← 성경 다시 선택
            </button>
            <h2 className="text-2xl font-black text-white mb-6">📖 {selectedBook.name} - 장 선택</h2>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => handleChapterSelect(chapter)}
                  className="p-3 bg-white/5 hover:bg-white/20 border border-white/10 hover:border-purple-400 rounded-xl text-white font-bold transition-all hover:scale-110"
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 대본 생성 */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <button onClick={() => setStep(2)} className="text-purple-300 hover:text-white text-sm mb-4">
              ← 장 다시 선택
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl">
                ✍️
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{selectedBook.name} {selectedChapter}장</h2>
                <p className="text-purple-300">QT 대본 생성</p>
              </div>
            </div>

            {!script && !loading && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-white mb-2">📝 추가 참고 자료 (선택)</label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40"
                    placeholder="추가로 참고할 내용..."
                  />
                </div>
                <button
                  onClick={generateScript}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-black text-lg"
                >
                  📖 대본 생성하기
                </button>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">⏳</div>
                </div>
                <p className="text-white text-lg font-bold">{loadingMessage}</p>
              </div>
            )}

            {script && !loading && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">🎤 생성된 대본</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(script, 'script')}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold"
                    >
                      {copied === 'script' ? '✓ 복사됨!' : '📋 복사'}
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="w-full h-80 px-4 py-3 rounded-xl text-sm leading-relaxed bg-white text-gray-900 border-2 border-emerald-500"
                />

                <button
                  onClick={confirmScript}
                  className="w-full mt-4 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-black text-lg"
                >
                  ✅ 대본 확정 → 이미지 프롬프트 생성
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: 대본 + 이미지 프롬프트 (좌우 분할) */}
        {step === 4 && (
          <div className="flex gap-4 h-[calc(100vh-120px)]">
            {/* 왼쪽: 대본 */}
            <div className="w-1/2 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">📄 대본</h3>
                <button onClick={() => setStep(3)} className="text-purple-300 text-xs">← 수정</button>
              </div>
              
              <div className="flex-1 overflow-y-auto bg-white/5 rounded-xl p-4">
                <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                  {imagePrompts.length > 0 ? (
                    // 하이라이트된 대본
                    <HighlightedScript script={script} prompts={imagePrompts} />
                  ) : (
                    script
                  )}
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 프롬프트 */}
            <div className="w-1/2 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">🎨 이미지 프롬프트</h3>
                {imagePrompts.length > 0 && (
                  <button
                    onClick={() => copyToClipboard(
                      imagePrompts.map(p => `#${p.number}: ${p.prompt}`).join('\n\n'),
                      'all'
                    )}
                    className="px-3 py-1 bg-pink-500 text-white rounded-lg text-xs font-bold"
                  >
                    {copied === 'all' ? '✓' : '📋 전체 복사'}
                  </button>
                )}
              </div>

              {imagePrompts.length === 0 && !loading && (
                <div className="flex-1 flex items-center justify-center">
                  <button
                    onClick={generateImagePrompts}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-black text-lg"
                  >
                    🎨 이미지 프롬프트 생성
                  </button>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 relative">
                      <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">🎨</div>
                    </div>
                    <p className="text-white font-bold">{loadingMessage}</p>
                  </div>
                </div>
              )}

              {imagePrompts.length > 0 && !loading && (
                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {imagePrompts.map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedPrompt(idx)}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:border-pink-500/50 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black px-2 py-1 rounded">
                          #{p.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-xs leading-relaxed line-clamp-2">{p.prompt}</p>
                          {p.scriptRef && (
                            <p className="text-pink-300/60 text-[10px] mt-1 truncate">
                              📍 {p.scriptRef.substring(0, 50)}...
                            </p>
                          )}
                        </div>
                        <span className="text-white/40 text-xs group-hover:text-white">클릭 →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 프롬프트 상세 모달 */}
      {selectedPrompt !== null && imagePrompts[selectedPrompt] && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPrompt(null)}
        >
          <div 
            className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black px-4 py-2 rounded-xl text-lg">
                  #{imagePrompts[selectedPrompt].number}
                </span>
                <button 
                  onClick={() => setSelectedPrompt(null)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* 대본 위치 */}
              {imagePrompts[selectedPrompt].scriptRef && (
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-4">
                  <p className="text-purple-300 text-xs font-bold mb-1">📍 대본 위치</p>
                  <p className="text-white text-sm">{imagePrompts[selectedPrompt].scriptRef}</p>
                </div>
              )}

              {/* 영문 프롬프트 */}
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/60 text-xs font-bold">🇺🇸 영문 프롬프트</p>
                  <button
                    onClick={() => copyToClipboard(imagePrompts[selectedPrompt].prompt, `modal-${selectedPrompt}`)}
                    className="px-2 py-1 bg-white/10 text-white rounded text-xs"
                  >
                    {copied === `modal-${selectedPrompt}` ? '✓' : '복사'}
                  </button>
                </div>
                <p className="text-white text-sm leading-relaxed">{imagePrompts[selectedPrompt].prompt}</p>
              </div>

              {/* 한글 설명 */}
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 mb-4">
                <p className="text-emerald-300 text-xs font-bold mb-1">🇰🇷 한글 설명</p>
                <p className="text-white text-sm">{imagePrompts[selectedPrompt].koreanDesc || '(한글 설명 없음)'}</p>
              </div>

              {/* 수정 요청 */}
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
                <p className="text-amber-300 text-xs font-bold mb-2">✏️ 프롬프트 수정 요청</p>
                <textarea
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/40"
                  placeholder="수정하고 싶은 내용을 입력하세요... (예: 색상을 더 따뜻하게, 인물을 추가해줘)"
                />
                <button
                  onClick={() => regeneratePrompt(selectedPrompt)}
                  disabled={editLoading || !editInstruction.trim()}
                  className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-white/10 text-white rounded-lg font-bold text-sm"
                >
                  {editLoading ? '수정 중...' : '🔄 프롬프트 수정하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-2 text-purple-300/50 text-xs">
        📖 하루 딱! 한 장 · Powered by Claude AI
      </div>
    </div>
  );
}

// 하이라이트된 대본 컴포넌트
function HighlightedScript({ script, prompts }) {
  const [hoveredNum, setHoveredNum] = useState(null);
  
  // 대본에서 각 프롬프트의 참조 위치 찾기
  const getMarkedScript = () => {
    const parts = [];
    let lastIndex = 0;
    const markers = [];
    
    prompts.forEach((p) => {
      if (p.scriptRef && p.scriptRef.length > 5) {
        // 핵심 키워드 추출 (앞 20자)
        const searchText = p.scriptRef.substring(0, Math.min(25, p.scriptRef.length));
        const index = script.indexOf(searchText);
        if (index !== -1) {
          markers.push({
            start: index,
            end: index + Math.min(50, p.scriptRef.length),
            number: p.number
          });
        }
      }
    });
    
    // 위치순 정렬
    markers.sort((a, b) => a.start - b.start);
    
    // 겹치는 마커 제거
    const cleanMarkers = [];
    markers.forEach(m => {
      const last = cleanMarkers[cleanMarkers.length - 1];
      if (!last || m.start >= last.end) {
        cleanMarkers.push(m);
      }
    });
    
    // 파트 생성
    cleanMarkers.forEach((marker, idx) => {
      if (marker.start > lastIndex) {
        parts.push({ type: 'text', content: script.substring(lastIndex, marker.start) });
      }
      parts.push({ 
        type: 'highlight', 
        content: script.substring(marker.start, marker.end), 
        number: marker.number 
      });
      lastIndex = marker.end;
    });
    
    if (lastIndex < script.length) {
      parts.push({ type: 'text', content: script.substring(lastIndex) });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content: script }];
  };
  
  const parts = getMarkedScript();
  
  return (
    <div>
      {parts.map((part, idx) => (
        part.type === 'highlight' ? (
          <span 
            key={idx}
            className="relative inline bg-pink-500/30 border-b-2 border-pink-400 px-0.5 rounded cursor-pointer hover:bg-pink-500/50"
            onMouseEnter={() => setHoveredNum(part.number)}
            onMouseLeave={() => setHoveredNum(null)}
          >
            <span className="absolute -top-5 left-0 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              #{part.number}
            </span>
            {part.content}
          </span>
        ) : (
          <span key={idx}>{part.content}</span>
        )
      ))}
    </div>
  );
}
