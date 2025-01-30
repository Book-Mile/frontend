const imagesList = [
  'src/assets/images/makingGroup1.png',
  'src/assets/images/makingGroup2.png',
  'src/assets/images/makingGroup3.png',
  'src/assets/images/makingGroup4.png',
];

// Function to get random images
const getRandomImages = () => {
  const randomCount = Math.floor(Math.random() * 3); // Randomly choose 0 to 2 images
  const shuffledImages = imagesList.sort(() => 0.5 - Math.random());
  return shuffledImages.slice(0, randomCount);
};

export const checkPoints = [
  {
    recordId: 1,
    createdAt: '2025-01-29T13:03:23.682Z',
    currentPage: 155, // 추가된 더미 데이터
    text: "안녕하세요. sdsdf안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.",
    imageUrls: imagesList,
  },
  {
    recordId: 2,
    createdAt: '2024-10-08T00:00:00.000Z',
    currentPage: 160,
    text: '저희는 환경을 위해 노력하고 있으며 음식물 쓰레기 문제 해결을 위해 여러 아이디어를 준비하고 있습니다.',
    imageUrls: imagesList.slice(0, 3),
  },
  {
    recordId: 3,
    createdAt: '2024-10-15T00:00:00.000Z',
    currentPage: 180,
    text: '참가자분들의 불편함을 최소화하고 음식물 쓰레기를 보다 효과적으로 처리하기 위해 다양한 방안을 논의 중입니다.',
    imageUrls: imagesList.slice(0, 2),
  },
  {
    recordId: 4,
    createdAt: '2024-10-22T00:00:00.000Z',
    currentPage: 190,
    text: '첫 번째 프로토타입 제작을 완료했습니다. 음식물 쓰레기 처리 장치의 기본 구조와 작동 방식을 테스트하고 있습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 5,
    createdAt: '2024-10-29T00:00:00.000Z',
    currentPage: 250,
    text: '사용자 피드백을 수집하여 개선점을 파악했습니다. 장치의 크기와 사용 편의성에 대한 의견을 반영하여 설계를 수정하고 있습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 6,
    createdAt: '2024-11-05T00:00:00.000Z',
    currentPage: 280,
    text: '개선된 두 번째 프로토타입 제작이 진행 중입니다. 더 컴팩트한 사이즈와 향상된 처리 능력을 목표로 하고 있습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 7,
    createdAt: '2024-11-12T00:00:00.000Z',
    currentPage: 300,
    text: '현장 테스트를 위한 준비를 마쳤습니다. 실제 캠핑장에서의 성능 검증을 위한 계획을 수립했습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 8,
    createdAt: '2024-11-19T00:00:00.000Z',
    currentPage: 305,
    text: '첫 현장 테스트를 성공적으로 완료했습니다. 예상보다 높은 처리 효율을 보여주었으며, 사용자들의 반응도 긍정적이었습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 9,
    createdAt: '2024-11-26T00:00:00.000Z',
    currentPage: 155,
    text: '최종 제품의 디자인을 확정했습니다. 환경 친화적인 재료 선택과 에너지 효율성을 고려한 설계를 완료했습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 10,
    createdAt: '2024-12-03T00:00:00.000Z',
    currentPage: 155,
    text: '대량 생산을 위한 준비 단계에 돌입했습니다. 생산 파트너십 구축과 품질 관리 시스템을 정비하고 있습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 11,
    createdAt: '2024-12-10T00:00:00.000Z',
    currentPage: 155,
    text: '마케팅 전략을 수립하고 있습니다. 환경 보호의 가치를 강조하면서 제품의 실용성을 효과적으로 전달할 계획입니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 12,
    createdAt: '2024-12-17T00:00:00.000Z',
    currentPage: 155,
    text: '최종 테스트와 인증 절차를 진행 중입니다. 안전성과 환경 영향 평가를 통과하기 위한 준비를 하고 있습니다.',
    imageUrls: getRandomImages(),
  },
  {
    recordId: 13,
    createdAt: '2024-12-24T00:00:00.000Z',
    currentPage: 155,
    text: '출시 준비가 거의 완료되었습니다. 초기 판매 전략과 고객 지원 시스템을 구축했으며, 론칭 이벤트를 계획하고 있습니다.',
    imageUrls: getRandomImages(),
  },
];
