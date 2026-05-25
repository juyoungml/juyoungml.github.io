import type { SiteLocale } from './site'

export interface ChromeStrings {
  navHome: string
  navBlog: string
  jobTitle: string
  aboutHeading: string
  bioP1: string
  bioP2: string
  bioP3: string
  linkEmail: string
  linkGithub: string
  linkScholar: string
  linkSemanticScholar: string
  linkLinkedin: string
  latestPostsHeading: string
  papersHeading: string
  selectedWorkHeading: string
  noPosts: string
  dateLocale: string
  homeAriaSuffix: string
}

export const STRINGS: Record<SiteLocale, ChromeStrings> = {
  en: {
    navHome: 'Home',
    navBlog: 'Blog',
    jobTitle: 'ML engineer @ Trillion Labs',
    aboutHeading: 'About',
    bioP1:
      "Hi, I'm Juyoung, an ML engineer at Trillion Labs in Seoul. I work across long-context training, pretraining infrastructure, evals, and whatever else needs untangling on any given day.",
    bioP2:
      "What I enjoy most is going deep. I like understanding systems from the bottom up, finding the mechanisms underneath the abstractions, and automating away the parts that shouldn't need a human in the loop. I tend to follow my curiosity wherever it leads, especially when an abstraction feels too convenient.",
    bioP3:
      "Outside of work, I'm a perpetual beginner at a lot of things. I love picking up something new and finding out how far I can take it: cooking, a bit of piano, fumbling my way through bass lines. I write here when I learn something worth holding onto.",
    linkEmail: 'email',
    linkGithub: 'github',
    linkScholar: 'scholar',
    linkSemanticScholar: 'semantic scholar',
    linkLinkedin: 'linkedin',
    latestPostsHeading: 'latest posts',
    papersHeading: 'papers',
    selectedWorkHeading: 'selected work',
    noPosts: 'No public notes yet.',
    dateLocale: 'en',
    homeAriaSuffix: '— home',
  },
  ko: {
    navHome: '홈',
    navBlog: '블로그',
    jobTitle: 'ML 엔지니어 @ Trillion Labs',
    aboutHeading: '소개',
    bioP1:
      '안녕하세요, 서울 Trillion Labs에서 ML 엔지니어로 일하고 있는 석주영입니다. 롱컨텍스트 학습, 사전학습 인프라, 평가, 그리고 그날그날 풀어야 할 문제들을 다룹니다.',
    bioP2:
      '가장 즐기는 건 깊이 파고드는 일입니다. 시스템을 밑바닥부터 이해하고, 추상화 아래의 메커니즘을 찾아내고, 사람 손이 가지 않아도 되는 부분을 자동화하는 걸 좋아합니다. 어떤 추상화가 너무 편리하게 느껴질 때, 그 호기심을 끝까지 따라가는 편입니다.',
    bioP3:
      '일 밖에서는 영원한 초보자입니다. 새로운 걸 시작해서 어디까지 갈 수 있는지 확인하는 걸 좋아합니다 — 요리, 피아노 조금, 더듬어가며 연주하는 베이스. 여기에는 기록할 가치가 있다고 느낀 것들을 적습니다.',
    linkEmail: '이메일',
    linkGithub: '깃허브',
    linkScholar: '구글 스칼라',
    linkSemanticScholar: '시맨틱 스칼라',
    linkLinkedin: '링크드인',
    latestPostsHeading: '최근 글',
    papersHeading: '논문',
    selectedWorkHeading: '주요 작업',
    noPosts: '아직 공개된 글이 없습니다.',
    dateLocale: 'ko-KR',
    homeAriaSuffix: '— 홈',
  },
}
