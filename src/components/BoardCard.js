import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { cardSkeletons, miniCardSkeletons } from '../utils/CardsSkeletons';

const Card = ({ id, displayName, description, treasuresCost, cardType, isRevealed, handleAction, remainingCount, isSelected, playerID, gameState, isGainable, isFromCardPile }) => {
    if (!id || !displayName || !cardType) {
        console.error('Card data is incomplete or missing:', { id, displayName, cardType });
        return null; // Return nothing if card data is missing
    }

    const fixedCardType = id === "curse" ? "curse" : cardType;
    const src = `${process.env.PUBLIC_URL}/img/${id}.webp`;
    const skeleton = isFromCardPile ? miniCardSkeletons[fixedCardType] : cardSkeletons[fixedCardType];
    const extraProps = isSelected ? { border: '5px solid red' } : isGainable ? { border: '5px solid green' } : {}
    const isPlayerCard = playerID === gameState.youPlayerID;
    const cardImageVisibility = isRevealed || isPlayerCard;

    return (
        <Box
            sx={{
                width: '16vh',
                height: '15.5vh',
                border: '3px solid black',
                borderRadius: '8px',
                boxShadow: isRevealed ? '0px 0px 12px rgba(0, 0, 0, 0.2)' : '0px 0px 5px rgba(0, 0, 0, 0.1)',
                // backgroundImage: `url(${src})`,
                // padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'black',
                backgroundImage: `url(${skeleton})`,
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                opacity: isRevealed ? 1 : 0.7,
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

            {/* Card Image if it belongs to the player, even if unrevealed */}
            {cardImageVisibility && (
                <Box
                    component="img"
                    src={src}
                    sx={{
                        position: 'absolute',
                        top: '2.8vh',
                        left: '0.5vh',
                        width: '14vh',
                        height: '9.6vh',
                        objectFit: 'cover',
                        // zIndex: -1,
                        borderRadius: '4px',
                        marginBottom: '8px',
                        opacity: isRevealed ? 1 : 0.5 // Dim the image if it's unrevealed
                    }}
                />
            )}

            {/* Remaining Cards Count in the top-left corner */}
            {remainingCount !== undefined && (
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
            )}

            {/* Cost */}
            <Typography
                variant="caption"
                sx={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '0px',
                    backgroundColor: 'rgb(185, 135, 0)',
                    color: 'black',
                    fontWeight: 'bolder',
                    borderRadius: '100%',
                    lineHeight: '1.2',
                    border: '1px solid black',
                    padding: '0px 1vh',
                    fontSize: '2.3vh',
                }}
            >
                {treasuresCost}
            </Typography>

            {/* Display Name of Card */}
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#333', fontSize: '1.5vh', fontWeight: 'bold', marginTop: '0.4vh', marginLeft: '1vh' }}>
                {displayName}
            </Typography>
        </Box>
    );
};

export default Card;
