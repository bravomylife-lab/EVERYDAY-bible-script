# 하루 딱! 한 장 - QT 대본 & 이미지 프롬프트 생성기

📖 **EVERYDAY Bible Script - QT Script & Image Prompt Generator**

매일 성경 한 장을 묵상하는 QT(Quiet Time) 콘텐츠 제작을 위한 React 웹 애플리케이션입니다.

## ✨ 주요 기능

### 1. QT 대본 생성
- 성경 66권 전체 지원 (구약 39권 + 신약 27권)
- 10분 분량의 아침 명상용 대본 자동 생성
- Claude AI + 웹 검색을 통한 정확한 성경 본문 참조
- 성경 구절 인용 (25%) + 배경 설명/해석 (45%) + 적용 (30%) 밸런스
- 정중한 말투 (~습니다/~겠습니다 체)

### 2. 이미지 프롬프트 생성
- 20장의 종이 공예(Paper Art) 스타일 이미지 프롬프트
- 밝고 따뜻한 색감 (cream, soft yellow, dusty rose)
- 한글 텍스트 포함 (35%) + 순수 이미지 (65%)
- 16:9 비율 고정

## 🛠️ 기술 스택

- **Frontend:** React + Tailwind CSS
- **AI:** Claude API (claude-sonnet-4-20250514)
- **Tools:** Web Search Integration
- **Build:** Vite

## 📦 설치 방법

```bash
# 저장소 클론
git clone https://github.com/bravomylife-lab/EVERYDAY-bible-script.git

# 디렉토리 이동
cd EVERYDAY-bible-script

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🎯 사용 방법

1. **성경 선택:** 구약/신약에서 원하는 책 선택
2. **장 선택:** 묵상할 장 번호 선택
3. **대본 생성:** 추가 참고사항 입력 후 대본 생성
4. **대본 확정:** 생성된 대본 검토/수정 후 확정
5. **이미지 프롬프트:** 20개 프롬프트 자동 생성
6. **복사/다운로드:** 개별 또는 전체 복사/저장

## 📝 대본 구조

| 섹션 | 시간 | 내용 |
|------|------|------|
| 오프닝 | 1분 | 아침 인사 & 본문 소개 |
| 핵심 본문 | 1.5분 | 핵심 구절 2-3개 인용 |
| 배경 설명 | 2.5분 | 역사적/신학적 배경 |
| 의미 해석 | 2.5분 | 본문 뜻풀이 |
| 적용 | 1.5분 | 삶의 적용점 3가지 |
| 기도 | 0.5분 | 함께 드리는 기도 |
| 클로징 | 0.5분 | 마무리 인사 |

## 🎨 이미지 프롬프트 스타일

- **색상:** warm cream, soft yellow, dusty rose, terracotta, sage green
- **스타일:** Layered paper craft, clean flat design
- **분위기:** 밝고 따뜻한 아침의 고요함
- **상징물:** 왕관, 두루마리, 성전, 촛대, 방패, 비둘기 등
- **비율:** 16:9 (필수)

## 📺 연결 채널

- **YouTube:** [하루 딱! 한 장](https://www.youtube.com/@haru1jang)

## 📄 라이선스

MIT License

---

Made with ❤️ for daily Bible study
