package ma.ac.uir.syndicproject.service;

import ma.ac.uir.syndicproject.model.Syndic;
import ma.ac.uir.syndicproject.repository.SyndicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private SyndicRepository syndicRepository;

    public boolean authenticate(String email, String password) {
        Syndic syndic = syndicRepository.findByEmail(email);
        if (syndic != null && syndic.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
