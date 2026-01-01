import React, { useState } from 'react';

const BIBLE_STRUCTURE = {
  oldTestament: [
    { name: "창세기", english: "Genesis", chapters: 50 },
    { name: "출애굽기", english: "Exodus", chapters: 40 },
    { name: "레위기", english: "Leviticus", chapters: 27 },
    { name: "민수기", english: "Numbers", chapters: 36 },
    { name: "신명기", english: "Deuteronomy", chapters: 34 },
    { name: "여호수아", english: "Joshua", chapters: 24 },
    { name: "사사기", english: "Judges", chapters: 21 },
    { name: "룻기", english: "Ruth", chapters: 4 },
    { name: "사무엘상", english: "1 Samuel", chapters: 31 },
    { name: "사무엘하", english: "2 Samuel", chapters: 24 },
    { name: "열왕기상", english: "1 Kings", chapters: 22 },
    { name: "열왕기하", english: "2 Kings", chapters: 25 },
    { name: "역대상", english: "1 Chronicles", chapters: 29 },
    { name: "역대하", english: "2 Chronicles", chapters: 36 },
    { name: "에스라", english: "Ezra", chapters: 10 },
    { name: "느헤미야", english: "Nehemiah", chapters: 13 },
    { name: "에스더", english: "Esther", chapters: 10 },
    { name: "욥기", english: "Job", chapters: 42 },
    { name: "시편", english: "Psalms", chapters: 150 },
    { name: "잠언", english: "Proverbs", chapters: 31 },
    { name: "전도서", english: "Ecclesiastes", chapters: 12 },
    { name: "아가", english: "Song of Solomon", chapters: 8 },
    { name: "이사야", english: "Isaiah", chapters: 66 },
    { name: "예레미야", english: "Jeremiah", chapters: 52 },
    { name: "예레미야애가", english: "Lamentations", chapters: 5 },
    { name: "에스겔", english: "Ezekiel", chapters: 48 },
    { name: "다니엘", english: "Daniel", chapters: 12 },
    { name: "호세아", english: "Hosea", chapters: 14 },
    { name: "요엘", english: "Joel", chapters: 3 },
    { name: "아모스", english: "Amos", chapters: 9 },
    { name: "오바댜", english: "Obadiah", chapters: 1 },
    { name: "요나", english: "Jonah", chapters: 4 },
    { name: "미가", english: "Micah", chapters: 7 },
    { name: "나훔", english: "Nahum", chapters: 3 },
    { name: "하박국", english: "Habakkuk", chapters: 3 },
    { name: "스바냐", english: "Zephaniah", chapters: 3 },
    { name: "학개", english: "Haggai", chapters: 2 },
    { name: "스가랴", english: "Zechariah", chapters: 14 },
    { name: "말라기", english: "Malachi", chapters: 4 }
  ],
  newTestament: [
    { name: "마태복음", english: "Matthew", chapters: 28 },
    { name: "마가복음", english: "Mark", chapters: 16 },
    { name: "누가복음", english: "Luke", chapters: 24 },
    { name: "요한복음", english: "John", chapters: 21 },
    { name: "사도행전", english: "Acts", chapters: 28 },
    { name: "로마서", english: "Romans", chapters: 16 },
    { name: "고린도전서", english: "1 Corinthians", chapters: 16 },
    { name: "고린도후서", english: "2 Corinthians", chapters: 13 },
    { name: "갈라디아서", english: "Galatians", chapters: 6 },
    { name: "에베소서", english: "Ephesians", chapters: 6 },
    { name: "빌립보서", english: "Philippians", chapters: 4 },
    { name: "골로새서", english: "Colossians", chapters: 4 },
    { name: "데살로니가전서", english: "1 Thessalonians", chapters: 5 },
    { name: "데살로니가후서", english: "2 Thessalonians", chapters: 3 },
    { name: "디모데전서", english: "1 Timothy", chapters: 6 },
    { name: "디모데후서", english: "2 Timothy", chapters: 4 },
    { name: "디도서", english: "Titus", chapters: 3 },
    { name: "빌레몬서", english: "Philemon", chapters: 1 },
    { name: "히브리서", english: "Hebrews", chapters: 13 },
    { name: "야고보서", english: "James", chapters: 5 },
    { name: "베드로전서", english: "1 Peter", chapters: 5 },
    { name: "베드로후서", english: "2 Peter", chapters: 3 },
    { name: "요한일서", english: "1 John", chapters: 5 },
    { name: "요한이서", english: "2 John", chapters: 1 },
    { name: "요한삼서", english: "3 John", chapters: 1 },
    { name: "유다서", english: "Jude", chapters: 1 },
    { name: "요한계시록", english: "Revelation", chapters: 22 }
  ]
};

export default function QTScriptGenerator() {
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [script, setScript] = useState('');
  const [imagePrompts, setImagePrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState('');

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
    setLoadingMessage('성경 본문을 검색하고 대본을 작성 중입니다...');
    setError('');
    
    const prompt = `당신은 전문 기독교 QT(Quiet Time) 대본 작가입니다.

**목표:**
아침 명상용 성경 QT 대본을 작성해주세요. 전문 성우가 잔잔하고 따뜻한 목소리로 읽을 10분 분량의 대본입니다.

**대본 요구사항:**

1. **톤 & 스타일:**
   - 아침에 어울리는 부드럽고 따뜻한 어조
   - 명상적이고 평화로운 분위기
   - 청취자에게 직접 말하듯 친근하면서도 정중한 느낌
   - 강요하지 않고 초대하는 톤 ("~하시길 바랍니다", "~해보시면 어떨까요")
   - **말투 (매우 중요):** 
     - "~요" 체가 아닌 "~습니다/~겠습니다" 체로 정중하게
     - 예: "만나요" (X) → "뵙겠습니다" (O)
     - 예: "읽어볼게요" (X) → "읽어보겠습니다" (O)
     - 예: "좋았어요" (X) → "좋았습니다" (O)
   - 문장 끝은 부드럽고 정중하게 ("~합니다", "~입니다", "~바랍니다", "~겠습니다")

2. **구조와 비율 (매우 중요!):**
   - **오프닝 (1분):** 아침 인사 & 오늘의 본문 소개
   - **핵심 본문 읽기 (1.5분):** 가장 중요한 핵심 구절 2-3개만 선별하여 인용
   - **역사적/신학적 배경 설명 (2.5분):** 이 본문이 쓰여진 시대, 상황, 문화적 배경 설명
   - **의미 해석과 뜻풀이 (2.5분):** 본문이 의미하는 바를 깊이 있게 풀어서 설명
   - **오늘 삶에 적용 (1.5분):** 구체적인 삶의 적용점 3가지
   - **기도 시간 (0.5분):** 아래 형식으로 기도
   - **클로징 (0.5분):** 희망찬 마무리 인사

3. **성경 인용 밸런스 (핵심!):**
   - 성경 구절 직접 인용: 전체의 25% 정도만
   - 해석/뜻풀이/배경설명: 전체의 45% 정도
   - 적용/묵상/기도: 전체의 30% 정도
   - 핵심 구절 2-3개만 직접 인용하고, 나머지는 요약하거나 설명으로 풀어주세요
   - 구절을 나열하지 말고, 이야기하듯 자연스럽게 녹여주세요

4. **배경 설명에 포함할 내용:**
   - 이 책이 쓰여진 시대와 저자
   - 당시 이스라엘/유대 민족의 상황
   - 문화적, 지리적 배경
   - 이 본문이 성경 전체에서 갖는 의미

5. **기도 시간 형식 (반드시 포함):**
   함께 기도하는 시간을 갖겠습니다.
   
   "하나님 아버지, 감사합니다. 
   오늘도 저희에게 ${selectedBook.name} ${selectedChapter}장 말씀을 허락해 주셨습니다.
   [오늘 말씀에서 깨달은 핵심 1가지 언급]
   오늘 일어날 수많은 만남과 상황 가운데, 
   오늘 주신 말씀을 기억하고 적용하며 승리하게 해주세요.
   예수님의 이름으로 기도드립니다. 아멘."

6. **클로징 형식:**
   - "오늘 하루도 당신의 인생이 하나님의 은혜 가운데 빛나시길 바랍니다."
   - "내일 또 말씀으로 뵙겠습니다. 하루 딱! 한 장이었습니다."
   - 따뜻하고 희망찬 느낌으로 마무리
   - **말투 주의:** "~요" 체가 아닌 "~습니다/~겠습니다" 체로 정중하게

7. **기술적 요구사항:**
   - 총 분량: 약 1,300~1,500 단어 (10분 낭독 기준)
   - 문장은 짧고 명확하게 (호흡 고려)
   - 쉼표와 마침표로 자연스러운 호흡 표시
   - 타임스탬프 없음

**오늘의 본문:**
${selectedBook.name} ${selectedChapter}장 (${selectedBook.english} Chapter ${selectedChapter})

${additionalNotes ? `**추가 참고 자료:**\n${additionalNotes}` : ''}

먼저 ${selectedBook.name} ${selectedChapter}장의 내용과 역사적 배경, 신학적 의미를 웹에서 검색한 후 대본을 작성해주세요.

**중요:** 성경 구절을 너무 많이 나열하지 마세요. 핵심 구절 2-3개만 인용하고, 나머지는 배경 설명, 의미 해석, 삶의 적용에 집중해주세요.

이제 10분 분량의 아침 명상 QT 대본을 작성해주세요. 대본만 출력하고, 다른 설명은 하지 마세요.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: prompt
          }],
          tools: [{
            type: 'web_search_20250305',
            name: 'web_search'
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      
      let scriptText = '';
      for (const block of data.content) {
        if (block.type === 'text') {
          scriptText += block.text + '\n';
        }
      }

      setScript(scriptText.trim());
      setLoading(false);
    } catch (error) {
      console.error('Error generating script:', error);
      setError('대본 생성 중 오류가 발생했습니다: ' + error.message);
      setLoading(false);
    }
  };

  const confirmScript = () => {
    setIsEditingScript(false);
    setStep(4);
  };

  const generateImagePrompts = async () => {
    setLoading(true);
    setLoadingMessage('페이퍼 아트 이미지 프롬프트를 생성 중입니다...');
    setError('');
    
    const prompt = `당신은 고급 종이 공예(Paper Art) 이미지 프롬프트 전문가입니다.

**목표:**
아래 QT 대본을 바탕으로 20장의 밝고 따뜻한 종이 공예 스타일 이미지 프롬프트를 생성해주세요.

**참고 스타일 (매우 중요!):**
- 밝고 따뜻한 색상: warm cream, soft yellow, dusty rose, terracotta, muted blue, sage green
- 깔끔한 레이어드 페이퍼 컷 스타일
- 플랫하면서도 입체감 있는 그래픽
- 밝은 배경 (cream, ivory, light beige)
- 성경적 상징물: 왕관, 두루마리, 성전, 촛대, 방패, 검, 비둘기, 올리브 가지 등
- 현대적이고 세련된 느낌

**프롬프트 요구사항:**

1. **필수 스타일 키워드:**
   - Bright and warm layered paper craft illustration
   - Clean flat design with subtle depth and soft shadows
   - Warm cream/ivory/light yellow background
   - Soft pastel color palette: cream, warm yellow, dusty rose, terracotta, sage green, muted blue
   - Modern minimalist paper cut aesthetic
   - Gentle morning light atmosphere
   - 16:9 aspect ratio (MUST)

2. **한글 텍스트 vs 순수 이미지 비율:**
   - **35% (7장):** 한글 텍스트 포함 - 질문형, 핵심 메시지, 성경 구절
   - **65% (13장):** 순수 종이 공예 이미지만 (텍스트 없음)
   
3. **한글 텍스트 이미지 스타일:**
   - 깔끔하고 현대적인 한글 폰트
   - 핵심 단어에 하이라이트 박스 (노란색/연한색)
   - 텍스트 주변에 종이 공예 장식 요소 배치
   - 예: "다윗은 왜 **경쟁국 왕**에게 친절을 베풀려 했을까요?"

4. **20장 구성:**
   - #1: 오프닝 타이틀 "하루 딱! 한 장" + 본문 정보 (한글)
   - #2-4: 성경 배경/상황 설정 (순수 이미지)
   - #5: 핵심 질문 또는 주제 (한글)
   - #6-8: 이야기 전개 장면 (순수 이미지)
   - #9: 핵심 성경 구절 (한글)
   - #10-12: 중요 사건/인물 (순수 이미지)
   - #13: 의미/해석 텍스트 (한글)
   - #14-16: 클라이맥스 장면 (순수 이미지)
   - #17: 적용 질문 (한글)
   - #18-19: 묵상/기도 이미지 (순수 이미지)
   - #20: 클로징 메시지 (한글) - 희망찬 마무리

5. **프롬프트 작성 형식 (각 80-100 단어):**
   
   **순수 이미지 프롬프트 예시:**
   "Bright layered paper craft illustration of [장면], featuring [요소들] in warm cream and soft yellow tones, [상징물] crafted from delicate paper layers, soft shadows creating gentle depth, clean minimalist composition on light ivory background, warm morning light atmosphere, modern paper cut art style, 16:9 aspect ratio"
   
   **한글 텍스트 프롬프트 예시:**
   "Clean paper craft style illustration with Korean text '[한글 텍스트]' in modern bold font, key word '[강조단어]' highlighted in soft yellow box, surrounded by paper craft elements like [요소들], warm cream background with subtle paper texture, bright and inviting atmosphere, 16:9 aspect ratio"

**대본:**
${script}

**본문:**
${selectedBook.name} ${selectedChapter}장

**출력 형식:**
#1: [상세 프롬프트] (한글 포함 여부 명시)
#2: [상세 프롬프트]
...
#20: [상세 프롬프트]

이제 20개의 밝고 따뜻한 종이 공예 이미지 프롬프트를 생성해주세요.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      let promptsText = '';
      if (data.content && Array.isArray(data.content)) {
        for (const block of data.content) {
          if (block.type === 'text') {
            promptsText += block.text + '\n';
          }
        }
      }

      console.log('Prompts Text:', promptsText);

      // 더 강력한 파싱: #1: ~ #2: 사이의 모든 텍스트를 하나의 프롬프트로 인식
      const parsedPrompts = [];
      const promptRegex = /#(\d+):\s*([\s\S]*?)(?=#\d+:|$)/g;
      let match;
      
      while ((match = promptRegex.exec(promptsText)) !== null) {
        const number = match[1];
        const promptContent = match[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
        if (promptContent) {
          parsedPrompts.push({
            number: number,
            prompt: promptContent
          });
        }
      }

      console.log('Parsed Prompts:', parsedPrompts);

      if (parsedPrompts.length === 0) {
        // 파싱 실패시 대체 방법: 단순 줄 단위 파싱
        const lines = promptsText.split('\n');
        let currentNum = '';
        let currentPrompt = '';
        
        for (const line of lines) {
          const numMatch = line.match(/^#(\d+):/);
          if (numMatch) {
            if (currentNum && currentPrompt) {
              parsedPrompts.push({ number: currentNum, prompt: currentPrompt.trim() });
            }
            currentNum = numMatch[1];
            currentPrompt = line.replace(/^#\d+:\s*/, '');
          } else if (currentNum && line.trim()) {
            currentPrompt += ' ' + line.trim();
          }
        }
        if (currentNum && currentPrompt) {
          parsedPrompts.push({ number: currentNum, prompt: currentPrompt.trim() });
        }
      }

      if (parsedPrompts.length === 0) {
        throw new Error('프롬프트를 파싱할 수 없습니다. 다시 시도해주세요.');
      }

      setImagePrompts(parsedPrompts);
      setLoading(false);
    } catch (error) {
      console.error('Error generating prompts:', error);
      setError('이미지 프롬프트 생성 중 오류가 발생했습니다: ' + error.message);
      setLoading(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setSelectedBook(null);
    setSelectedChapter(null);
    setAdditionalNotes('');
    setScript('');
    setImagePrompts([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-5 px-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              📖
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">하루 딱! 한 장</h1>
              <p className="text-purple-200 text-xs font-medium">QT Script Generator</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            {[
              { num: 1, label: '성경' },
              { num: 2, label: '장' },
              { num: 3, label: '대본' },
              { num: 4, label: '이미지' }
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num 
                      ? 'bg-white text-purple-600 shadow-lg' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-[10px] mt-0.5 ${step >= s.num ? 'text-white' : 'text-white/40'}`}>
                    {s.label}
                  </span>
                </div>
                {i < 3 && <div className={`w-6 h-0.5 rounded ${step > s.num ? 'bg-white' : 'bg-white/20'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* 새로운 장 시작하기 버튼 - Step 1이 아닐 때만 표시 */}
          {step > 1 && (
            <button
              onClick={resetAll}
              className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 backdrop-blur-sm border border-white/20"
            >
              🔄 새로운 장
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4">
        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-4 flex items-center gap-2 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Step 1: 성경 선택 */}
        {step === 1 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              📚 성경을 선택하세요
            </h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-bold text-amber-400 mb-3 pb-2 border-b border-amber-400/30">
                ● 구약성경 Old Testament
              </h3>
              <div className="grid grid-cols-7 gap-1.5">
                {BIBLE_STRUCTURE.oldTestament.map((book, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBookSelect(book)}
                    className="px-2 py-2 bg-gradient-to-br from-amber-500/80 to-orange-600/80 hover:from-amber-400 hover:to-orange-500 text-white rounded-lg text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-rose-400 mb-3 pb-2 border-b border-rose-400/30">
                ● 신약성경 New Testament
              </h3>
              <div className="grid grid-cols-7 gap-1.5">
                {BIBLE_STRUCTURE.newTestament.map((book, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBookSelect(book)}
                    className="px-2 py-2 bg-gradient-to-br from-rose-500/80 to-pink-600/80 hover:from-rose-400 hover:to-pink-500 text-white rounded-lg text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 장 선택 */}
        {step === 2 && selectedBook && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <button 
              onClick={() => setStep(1)} 
              className="text-purple-300 hover:text-white text-sm mb-4 flex items-center gap-1"
            >
              ← 성경 다시 선택
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                📖
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{selectedBook.name}</h2>
                <p className="text-purple-300">{selectedBook.english} · {selectedBook.chapters}장</p>
              </div>
            </div>
            
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(chapter => (
                <button
                  key={chapter}
                  onClick={() => handleChapterSelect(chapter)}
                  className="aspect-square flex items-center justify-center bg-white/10 hover:bg-gradient-to-br hover:from-violet-500 hover:to-purple-600 text-white/80 hover:text-white rounded-xl font-bold transition-all hover:scale-110 border border-white/10"
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 대본 생성 */}
        {step === 3 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <button 
              onClick={() => setStep(2)} 
              className="text-purple-300 hover:text-white text-sm mb-4 flex items-center gap-1"
            >
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">📝 추가 참고사항 (선택)</label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows="2"
                    placeholder="특정 주제 강조, 특별한 관점 등..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  onClick={generateScript}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl font-black text-lg transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
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
                <p className="text-purple-300 text-sm mt-1">약 30초~1분 소요</p>
              </div>
            )}

            {script && !loading && (
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="text-base font-bold text-white">📄 생성된 대본</h3>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsEditingScript(!isEditingScript)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                        isEditingScript ? 'bg-green-500 text-white' : 'bg-white/10 text-white'
                      }`}
                    >
                      {isEditingScript ? '✅완료' : '✏️수정'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(script, 'script')}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-bold"
                    >
                      {copied === 'script' ? '✓' : '📋'}복사
                    </button>
                    <button
                      onClick={() => downloadText(script, `${selectedBook.name}_${selectedChapter}장_대본.txt`)}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-bold"
                    >
                      💾저장
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  readOnly={!isEditingScript}
                  className={`w-full h-80 px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    isEditingScript 
                      ? 'bg-white text-gray-900 border-2 border-purple-500' 
                      : 'bg-white/5 text-white/90 border border-white/10'
                  }`}
                />

                <button
                  onClick={confirmScript}
                  className="w-full mt-4 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white rounded-xl font-black text-lg transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
                >
                  ✅ 대본 확정 → 이미지 프롬프트
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: 이미지 프롬프트 */}
        {step === 4 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20">
            <button 
              onClick={() => setStep(3)} 
              className="text-purple-300 hover:text-white text-sm mb-4 flex items-center gap-1"
            >
              ← 대본으로 돌아가기
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-2xl">
                🎨
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">이미지 프롬프트</h2>
                <p className="text-purple-300">페이퍼 아트 · 20장</p>
              </div>
            </div>

            {imagePrompts.length === 0 && !loading && (
              <div>
                <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 mb-4">
                  <p className="text-emerald-300 font-bold">✅ 대본이 확정되었습니다!</p>
                </div>

                <button
                  onClick={generateImagePrompts}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white rounded-xl font-black text-lg transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2"
                >
                  🎨 이미지 프롬프트 생성하기
                </button>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">🎨</div>
                </div>
                <p className="text-white text-lg font-bold">{loadingMessage}</p>
              </div>
            )}

            {imagePrompts.length > 0 && !loading && (
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="text-base font-bold text-white">🖼️ 프롬프트 ({imagePrompts.length}장)</h3>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => copyToClipboard(
                        imagePrompts.map(p => `#${p.number}: ${p.prompt}`).join('\n\n'),
                        'all'
                      )}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-bold"
                    >
                      {copied === 'all' ? '✓' : '📋'}전체복사
                    </button>
                    <button
                      onClick={() => downloadText(
                        imagePrompts.map(p => `#${p.number}: ${p.prompt}`).join('\n\n'),
                        `${selectedBook.name}_${selectedChapter}장_프롬프트.txt`
                      )}
                      className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm font-bold"
                    >
                      💾저장
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                  {imagePrompts.map((prompt, idx) => (
                    <div 
                      key={idx} 
                      className="bg-pink-500/10 border border-white/10 rounded-xl p-3 hover:border-pink-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <span className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-black px-2 py-0.5 rounded mb-2">
                            #{prompt.number}
                          </span>
                          <p className="text-white/80 text-xs leading-relaxed">{prompt.prompt}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(prompt.prompt, `p-${idx}`)}
                          className="shrink-0 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-xs"
                        >
                          {copied === `p-${idx}` ? '✓' : '📋'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetAll}
                  className="w-full mt-4 py-4 bg-slate-600 hover:bg-slate-500 text-white rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2"
                >
                  🔄 새로운 QT 시작하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-purple-300/50 text-xs">
        📖 하루 딱! 한 장 · Powered by Claude AI
      </div>
    </div>
  );
}
