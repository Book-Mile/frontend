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
    id: 1, // 추가된 id
    date: '2024.10.04',
    title: 'CHECK POINT 1',
    description:
      "안녕하세요. 저희는 2024 학기 사회공헌 프로젝트에 참여한 팀 '그린리프'입니다. 즐거운 캠프 생활을 하면서 맛있는 음식을 많이 드시 텐데요, 남은 음식물이나 국물을 버릴 장소가 없어 곤란했던 경험이 다들 한 번쯤 있으실 거라 생각합니다.",
    images: imagesList, // Randomly assigned images
  },
  {
    id: 2, // 추가된 id
    date: '2024.10.08',
    title: 'CHECK POINT 2',
    description:
      '저희는 환경을 위해 노력하고 있으며 음식물 쓰레기 문제 해결을 위해 여러 아이디어를 준비하고 있습니다.',
    images: imagesList.slice(0, 3), // Randomly assigned images
  },
  {
    id: 3, // 추가된 id
    date: '2024.10.15',
    title: 'CHECK POINT 3',
    description:
      '참가자분들의 불편함을 최소화하고 음식물 쓰레기를 보다 효과적으로 처리하기 위해 다양한 방안을 논의 중입니다.',
    images: imagesList.slice(0, 2), // Randomly assigned images
  },
  {
    id: 4, // 추가된 id
    date: '2024.10.22',
    title: 'CHECK POINT 4',
    description:
      '첫 번째 프로토타입 제작을 완료했습니다. 음식물 쓰레기 처리 장치의 기본 구조와 작동 방식을 테스트하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 5, // 추가된 id
    date: '2024.10.29',
    title: 'CHECK POINT 5',
    description:
      '사용자 피드백을 수집하여 개선점을 파악했습니다. 장치의 크기와 사용 편의성에 대한 의견을 반영하여 설계를 수정하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 6, // 추가된 id
    date: '2024.11.05',
    title: 'CHECK POINT 6',
    description:
      '개선된 두 번째 프로토타입 제작이 진행 중입니다. 더 컴팩트한 사이즈와 향상된 처리 능력을 목표로 하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 7, // 추가된 id
    date: '2024.11.12',
    title: 'CHECK POINT 7',
    description:
      '현장 테스트를 위한 준비를 마쳤습니다. 실제 캠핑장에서의 성능 검증을 위한 계획을 수립했습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 8, // 추가된 id
    date: '2024.11.19',
    title: 'CHECK POINT 8',
    description:
      '첫 현장 테스트를 성공적으로 완료했습니다. 예상보다 높은 처리 효율을 보여주었으며, 사용자들의 반응도 긍정적이었습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 9, // 추가된 id
    date: '2024.11.26',
    title: 'CHECK POINT 9',
    description:
      '최종 제품의 디자인을 확정했습니다. 환경 친화적인 재료 선택과 에너지 효율성을 고려한 설계를 완료했습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 10, // 추가된 id
    date: '2024.12.03',
    title: 'CHECK POINT 10',
    description:
      '대량 생산을 위한 준비 단계에 돌입했습니다. 생산 파트너십 구축과 품질 관리 시스템을 정비하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 11, // 추가된 id
    date: '2024.12.10',
    title: 'CHECK POINT 11',
    description:
      '마케팅 전략을 수립하고 있습니다. 환경 보호의 가치를 강조하면서 제품의 실용성을 효과적으로 전달할 계획입니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 12, // 추가된 id
    date: '2024.12.17',
    title: 'CHECK POINT 12',
    description:
      '최종 테스트와 인증 절차를 진행 중입니다. 안전성과 환경 영향 평가를 통과하기 위한 준비를 하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
  {
    id: 13, // 추가된 id
    date: '2024.12.24',
    title: 'CHECK POINT 13',
    description:
      '출시 준비가 거의 완료되었습니다. 초기 판매 전략과 고객 지원 시스템을 구축했으며, 론칭 이벤트를 계획하고 있습니다.',
    images: getRandomImages(), // Randomly assigned images
  },
];
