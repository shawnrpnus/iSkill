package com.iskill.backend.security;

import com.iskill.backend.models.Employee;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.iskill.backend.security.SecurityConstants.EXPIRATION_TIME;
import static com.iskill.backend.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    //generates token after authentication (used in EmployeeController)
    public String generateToken(Authentication authentication) {

        Employee employee = (Employee) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime()+ EXPIRATION_TIME);
        String employeeId = Long.toString(employee.getEmployeeId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("employeeId",(Long.toString(employee.getEmployeeId())));
        claims.put("username", employee.getUsername());
        claims.put("name", employee.getName());
        claims.put("costCenter", employee.getCostCenter());
        claims.put("shift", employee.getShift());
        claims.put("role", employee.getRole());

        return Jwts.builder()
                .setSubject(employeeId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    //Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT Signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT Token");
        } catch(ExpiredJwtException ex) {
            System.out.println("Expired JWT Token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT Token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    //Get User ID from token
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("employeeId");

        return Long.parseLong(id);
    }
}
