import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Podium3D = ({ topThree }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 기본 Three.js 설정
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 장면, 카메라, 렌더러 초기화
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10); // 카메라 위치
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // 배경 색상 설정 (화사한 색으로)
    scene.background = new THREE.Color(0x87CEEB); // 하늘색 배경

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 부드러운 조명
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // 원 생성
    const createPodium = (height, color, x, name, imageURL) => {
      const geometry = new THREE.CylinderGeometry(1, 1, height, 32);
      const material = new THREE.MeshStandardMaterial({ color });
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.userData = { name, x }; // 원 데이터 저장 (이름과 x 좌표)

      cylinder.position.set(x, height / 2, 0); // 위치 설정
      scene.add(cylinder);

      // 이름 텍스트 생성
      const loader = new THREE.TextureLoader();
      loader.load(imageURL, (texture) => {
        const planeGeometry = new THREE.PlaneGeometry(2, 2);
        const planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(x, height + 1.5, 0); // 원기둥 위
        scene.add(plane);
      });

      const textCanvas = document.createElement('canvas');
      const textContext = textCanvas.getContext('2d');
      textCanvas.width = 256;
      textCanvas.height = 64;

      textContext.fillStyle = '#000';
      textContext.font = '24px Arial';
      textContext.textAlign = 'center';
      textContext.fillText(name, 128, 32);

      const textTexture = new THREE.CanvasTexture(textCanvas);
      const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
      const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.5), textMaterial);
      textPlane.position.set(x, height + 1, 0.5);
      scene.add(textPlane);

      return cylinder;
    };

    // 1등, 2등, 3등 원기둥 생성 (배치 수정)
    createPodium(7, 'gold', 0, topThree[0].name, topThree[0].profileImage);  // 1등은 중앙
    createPodium(5, 'silver', -4, topThree[1].name, topThree[1].profileImage);  // 2등은 왼쪽
    createPodium(4, 'bronze', 4, topThree[2].name, topThree[2].profileImage);  // 3등은 오른쪽

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [topThree]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Podium3D;
