/* eslint-disable react/prop-types */

const RankingList = ({ rankings }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2
        style={{
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px',
          marginBottom: '20px',
        }}
      >
        순위 리스트
      </h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {rankings.map((rank, index) => (
          <li
            key={rank.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
              {index + 4}등
            </span>
            <span style={{ flexGrow: 1 }}>{rank.name}</span>
            <span style={{ color: '#555', fontWeight: 'bold' }}>
              {rank.score}점
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
