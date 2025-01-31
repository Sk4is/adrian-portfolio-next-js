"use client";

import React, { CSSProperties, forwardRef, useEffect, useRef } from "react";
import { Flex } from "./Flex"; // Asegúrate de que este archivo exista
import classNames from "classnames";
import styles from "./Background.module.scss"; // Asegúrate de que los estilos existan
import ParticlesCanvas from "./Particles.canvas"; // Importamos el componente de partículas

interface MaskProps {
  cursor: string; // Tipo string para el cursor
  x: number;
  y: number;
  radius: number;
}

interface GradientProps {
  display: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  tilt: number;
  colorStart: string;
  colorEnd: string;
  opacity: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
}

interface DotsProps {
  display: boolean;
  color: string;
  size: number; // tamaño de los puntos (número)
  opacity: number; // opacidad de los puntos (número)
}

// Definimos las propiedades de `grid`
interface GridProps {
  display: boolean;
  color: string;
  width: number;
  height: number;
  opacity: number;
}

interface LinesProps {
  display: boolean;
  opacity: number;
}

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: CSSProperties["position"];
  mask?: MaskProps;
  gradient?: GradientProps;
  dots?: DotsProps; 
  grid?: GridProps; // Añadimos grid aquí
  lines?: LinesProps;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>((
  { position = "fixed", mask, gradient, dots, grid, lines, children, className, style, ...rest },
  ref
) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && backgroundRef.current) {
      if (typeof ref === "function") ref(backgroundRef.current);
      else (ref as React.MutableRefObject<HTMLDivElement>).current = backgroundRef.current;
    }
  }, [ref]);

  return (
    <div
      ref={backgroundRef}
      className={classNames(styles.background, className)}
      style={{ position, ...style }}
      {...rest}
    >
      {/* Partículas dinámicas */}
      <ParticlesCanvas />

      {/* Aplicamos la máscara si la propiedad `mask` está presente */}
      {mask && (
        <div
          className={styles.mask}
          style={{
            cursor: mask.cursor,
            top: `${mask.y}%`,
            left: `${mask.x}%`,
            borderRadius: `${mask.radius}%`,
          }}
        />
      )}

      {/* Gradiente de fondo opcional */}
      {gradient && (
        <div
          className={styles.gradient}
          style={{
            background: `linear-gradient(${gradient.tilt}deg, ${gradient.colorStart}, ${gradient.colorEnd})`,
            width: `${gradient.width}px`,
            height: `${gradient.height}px`,
            position: "absolute",
            top: `${gradient.y}%`,
            left: `${gradient.x}%`,
            opacity: gradient.opacity / 100,
          }}
        />
      )}

      {/* Dots - Añadimos la lógica para manejar la propiedad `dots` */}
      {dots && dots.display && (
        <div
          className={styles.dots}
          style={{
            backgroundColor: dots.color,
            width: `${dots.size}px`,
            height: `${dots.size}px`,
            opacity: dots.opacity / 100,
            position: "absolute",
            top: "50%", // Ajustar según sea necesario
            left: "50%", // Ajustar según sea necesario
            borderRadius: "50%", // Hacemos los puntos circulares
          }}
        />
      )}

      {/* Grid - Añadimos la lógica para manejar la propiedad `grid` */}
      {grid && grid.display && (
        <div
          className={styles.grid}
          style={{
            borderColor: grid.color,
            width: `${grid.width}px`,
            height: `${grid.height}px`,
            opacity: grid.opacity / 100,
            position: "absolute",
            top: "50%", // Ajustar según sea necesario
            left: "50%", // Ajustar según sea necesario
            borderStyle: "solid",
            borderWidth: "1px", // Añadir borde de 1px para representar la rejilla
          }}
        />
      )}

      {/* Lines - Añadimos la lógica para manejar la propiedad `lines` */}
      {lines && lines.display && (
        <div
          className={styles.lines}
          style={{
            opacity: lines.opacity / 100,
            position: "absolute",
            top: "50%", // Ajustar según sea necesario
            left: "50%", // Ajustar según sea necesario
            height: "100%", // Ajustar altura según sea necesario
            width: "1px", // Líneas verticales
            backgroundColor: "black", // Definir el color de las líneas
          }}
        />
      )}

      {/* Contenido adicional */}
      {children}
    </div>
  );
});

Background.displayName = "Background";

export { Background };
