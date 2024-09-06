import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { cardSkeletons } from '../utils/CardsSkeletons';

const Card = ({ id, displayName, description, treasuresCost, cardType, isRevealed, handleAction, playerID, remainingCount, actionInProgress }) => {
    const src = `${process.env.PUBLIC_URL}/img/${id}.webp`;
    const skeleton = cardSkeletons[cardType];

    useEffect(() => {
        // Placeholder for additional effects
    }, [handleAction, actionInProgress]);

    // useEffect(() => {
    //     console.log('Action for this card:', id, handleAction);
    // }, [handleAction]);
  
    return (
        <Box
            sx={{
                width: '100px',
                height: '150px',
                borderRadius: '8px',
                boxShadow: isRevealed ? '0px 0px 12px rgba(0, 0, 0, 0.2)' : '0px 0px 5px rgba(0, 0, 0, 0.1)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                backgroundImage: `url(${skeleton})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isRevealed ? 1 : 0.7,
                position: 'relative',
                cursor: handleAction ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    boxShadow: handleAction ? '0px 0px 20px rgba(0, 0, 0, 0.3)' : '0px 0px 10px rgba(0, 0, 0, 0.15)',
                    transform: handleAction ? 'scale(1.02)' : 'none' // Slight zoom effect
                }
            }}
            onClick={handleAction}
        >
            {/* Remaining Cards Count in the top-left corner */}
            {remainingCount !== undefined && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    {remainingCount}
                </Typography>
            )}

            {/* Card Image if not obfuscated */}
            {isRevealed && id !== 'obfuscated' && (
                <Box
                    component="img"
                    src={src}
                    alt={displayName}
                    sx={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '8px'
                    }}
                />
            )}

            {/* Display Name of Card */}
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#333', fontSize: '13px', fontWeight: 'bold', marginTop: '4px' }}>
                {displayName}
            </Typography>

            {/* Card Type and Cost */}
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', fontSize: '10px', marginTop: '2px' }}>
                {cardType.charAt(0).toUpperCase() + cardType.slice(1)} - Cost: {treasuresCost}
            </Typography>

            {/* Card Description */}
            <Typography variant="caption" sx={{ textAlign: 'center', color: '#777', fontSize: '9px', fontStyle: 'italic', marginTop: '4px' }}>
                {description}
            </Typography>
        </Box>
    );
};

export default Card;
