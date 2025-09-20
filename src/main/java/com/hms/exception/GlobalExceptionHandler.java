package com.hms.exception;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.HashMap;
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle(Exception ex){
        HashMap<String,Object> m = new HashMap<>();
        m.put("timestamp", LocalDateTime.now().toString());
        m.put("error", ex.getMessage());
        return ResponseEntity.status(500).body(m);
    }
}
