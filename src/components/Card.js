import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { cardSkeletons, miniCardSkeletons } from '../utils/CardsSkeletons';

const Card = ({ id, displayName, description, treasuresCost, cardType, isRevealed, handleAction, remainingCount, isSelected, playerID, gameState, isGainable, isFromCardPile }) => {
    if (!id || !displayName || !cardType) {
        console.error('Card data is incomplete or missing:', { id, displayName, cardType });
        return null; // Return nothing if card data is missing
    }

    const src = `${process.env.PUBLIC_URL}/img/${id}.webp`;
    const skeleton = isFromCardPile ? miniCardSkeletons[cardType] : cardSkeletons[cardType];
    const extraProps = isSelected ? { border: '5px solid red' } : isGainable ? { border: '5px solid green' } : {}
    const isPlayerCard = playerID === gameState.youPlayerID;
    const cardImageVisibility = isRevealed || isPlayerCard;

    return (
        <Box
            sx={{
                width: '14vh',
                height: '20vh',
                border: '3px solid black',
                borderRadius: '8px',
                boxShadow: isRevealed ? '0px 0px 12px rgba(0, 0, 0, 0.2)' : '0px 0px 5px rgba(0, 0, 0, 0.1)',
                // backgroundImage: `url(${src})`,
                // padding: '8px', Why this has changed? 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'black',
                backgroundImage: `url(${skeleton})`,
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                opacity: 1,
                position: 'relative',
                cursor: handleAction ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    boxShadow: handleAction ? '0px 0px 20px rgba(0, 0, 0, 0.3)' : '0px 0px 10px rgba(0, 0, 0, 0.15)',
                    transform: handleAction ? 'scale(1.02)' : 'none' // Slight zoom effect
                },
                ...extraProps
            }}
            onClick={handleAction ? handleAction : null}
        >
            {/* Remaining Cards Count in the top-left corner */}
            {/* {remainingCount !== undefined && (
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        backgroundColor: 'red',
                        color: 'white',
                        fontWeight: 'bolder',
                        borderRadius: '20%',
                        lineHeight: '1.2',
                        border: '1px solid black',
                        padding: '0px 4px',
                        fontSize: '2vh',
                    }}
                >
                    {remainingCount}
                </Typography>
            )} */}

            {/* Card Image if it belongs to the player, even if unrevealed */}
            {cardImageVisibility && (
                <Box
                    component="img"
                    src={src}
                    alt={displayName}
                    sx={{
                        position: 'absolute',
                        top: '2.6vh',
                        left: '1.3vh',
                        width: '10.5vh',
                        height: '14vh',
                        objectFit: 'cover',
                        opacity: 1
                    }}
                />
            )}

            {/* Display Name of Card */}
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#333', fontSize: '1.6vh', fontWeight: 'bold', marginTop: '0.3vh' }}>
                {displayName}
            </Typography>

            {/* Card Type and Cost */}
            {/* <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', fontSize: '10px', marginTop: '2px' }}>
                {cardType.charAt(0).toUpperCase() + cardType.slice(1)} - Cost: {treasuresCost}
            </Typography> */}

            {/* Card Description */}
            {/* <Typography variant="caption" sx={{ textAlign: 'center', color: '#777', fontSize: '9px', fontStyle: 'italic', marginTop: '4px' }}>
                {description}
            </Typography> */}
        </Box>
    );
};

export default Card;
