import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Card = ({ id, displayName, description, treasuresCost, cardType, isRevealed, handleAction, playerID, remainingCount  }) => {
    const src = `${process.env.PUBLIC_URL}/img/${id}.webp`;
    const backgroundImage = id == 'obfuscated' ? `${process.env.PUBLIC_URL}/img/back.jpg` : 'none';
    const cardClassName = handleAction ? "card clickable" : "card";
    console.log('handleAction CARD', handleAction);
  return (
    <Box
      className={cardClassName}
      sx={{
        width: '100px',
        height: '150px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isRevealed ? 1 : 0.5,
        position: 'relative',
        cursor: handleAction ? 'pointer' : 'default',
        '&:hover': {
            boxShadow: handleAction ? '0px 0px 15px rgba(0, 0, 0, 0.3)' : '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }

      }}
      onClick={handleAction}
      
    >
      {remainingCount !== undefined && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        fontSize: '12px'
                    }}
                >
                    {remainingCount}
                </Typography>
            )}
    {/* Display card image if not obfuscated */}
    {id !== 'obfuscated' && (
      <Box
        component="img"
        src={src}
        alt={displayName}
        sx={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px',
          }}
        />
      )}

      <Typography variant="h6" sx={{ textAlign: 'center', color: 'black', fontSize: '12px', color: 'black' }}>
        {displayName}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'center', color: 'black', fontSize: '10px', color: 'black' }}>
        {cardType.charAt(0).toUpperCase() + cardType.slice(1)} - Cost: {treasuresCost}
      </Typography>
      <Typography variant="caption" sx={{ textAlign: 'center', color: 'gray', fontSize: '8px', color: 'gray'  }}>
        {description}
      </Typography>
    </Box>
  );
};

export default Card;
