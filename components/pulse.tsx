import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface PulseImage {
    style?: ImageStyle;
    source: ImageSourcePropType;
}

interface PulseProps {
    color?: string;
    diameter?: number;
    duration?: number;
    image?: PulseImage | null;
    initialDiameter?: number;
    numPulses?: number;
    pulseStyle?: ViewStyle;
    speed?: number;
    style?: ViewStyle;
}

interface PulseItem {
    pulseKey: number;
    diameter: number;
    opacity: number;
    centerOffset: number;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    pulse: {
        position: 'absolute',
        flex: 1,
    },
});

const Pulse: React.FC<PulseProps> = ({
    color = 'blue',
    diameter = 400,
    duration = 1000,
    image = null,
    initialDiameter = 0,
    numPulses = 3,
    pulseStyle = {},
    speed = 10,
    style = {
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
}) => {
    const [pulses, setPulses] = useState<PulseItem[]>([]);
    const [started, setStarted] = useState(false);

    const mountedRef = useRef(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        setStarted(true);

        // Create pulses
        for (let i = 0; i < numPulses; i++) {
            const timeout = setTimeout(() => {
                if (!mountedRef.current) return;

                setPulses((prev) => [
                    ...prev,
                    {
                        pulseKey: prev.length + 1,
                        diameter: initialDiameter,
                        opacity: 0.5,
                        centerOffset: (diameter - initialDiameter) / 2,
                    },
                ]);
            }, i * duration);

            timeoutRefs.current.push(timeout);
        }

        // Animate pulses
        intervalRef.current = setInterval(() => {
            if (!mountedRef.current) return;

            setPulses((prev) =>
                prev.map((p, i) => {
                    const newDiameter =
                        p.diameter > diameter ? 0 : p.diameter + 2;

                    const centerOffset = (diameter - newDiameter) / 2;
                    const opacity = Math.abs(newDiameter / diameter - 1);

                    return {
                        pulseKey: i + 1,
                        diameter: newDiameter,
                        opacity: opacity > 0.5 ? 0.5 : opacity,
                        centerOffset,
                    };
                })
            );
        }, speed);

        return () => {
            mountedRef.current = false;

            timeoutRefs.current.forEach(clearTimeout);
            timeoutRefs.current = [];

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [numPulses, duration, speed, diameter, initialDiameter]);

    const containerStyle = [styles.container, style];
    const pulseWrapperStyle = {
        width: diameter,
        height: diameter,
    };

    return (
        <View style={containerStyle}>
            {started && (
                <View style={pulseWrapperStyle}>
                    {pulses.map((pulse) => (
                        <View
                            key={pulse.pulseKey}
                            style={[
                                styles.pulse,
                                {
                                    backgroundColor: color,
                                    width: pulse.diameter,
                                    height: pulse.diameter,
                                    opacity: pulse.opacity,
                                    borderRadius: pulse.diameter / 2,
                                    top: pulse.centerOffset,
                                    left: pulse.centerOffset,
                                },
                                pulseStyle,
                            ]}
                        />
                    ))}

                    {image && (
                        <Image
                            style={image.style}
                            source={image.source}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default Pulse;
