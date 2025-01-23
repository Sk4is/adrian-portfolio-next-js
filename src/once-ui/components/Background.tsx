"use client";

import React, { CSSProperties, forwardRef, useEffect, useRef } from "react";
import { Flex } from "./Flex"; // Asegúrate de que este archivo exista
import classNames from "classnames";
import styles from "./Background.module.scss"; // Asegúrate de que los estilos existan
import ParticlesCanvas from "./Particles.canvas"; // Importamos el componente de partículas

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: CSSProperties["position"];
  gradient?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  (
    {
      position = "fixed",
      gradient = false,
      children,
      className,
      style,
      ...rest
    },
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

        {/* Gradiente de fondo opcional */}
        {gradient && <div className={styles.gradient} />}

        {/* Contenido adicional */}
        {children}
      </div>
    );
  }
);

Background.displayName = "Background";

export { Background };
